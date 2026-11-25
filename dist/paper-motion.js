const PAPER_PULL_DURATION = 440;

// Normalized to one paper thickness: a drop from rest takes 200 ms.
const PAPER_GRAVITY = 50;
const PAPER_RESTITUTION = .22;
const PAPER_MAX_REBOUND = .05;

function advancePaperLift(position, velocity, milliseconds) {
  const seconds = milliseconds / 1000;
  const omega = 36;
  const coefficient = velocity + omega * position;
  const decay = Math.exp(-omega * seconds);
  position = (position + coefficient * seconds) * decay;
  velocity = (velocity - omega * coefficient * seconds) * decay;
  if (position < 0 || position > 1) {
    position = Math.max(0, Math.min(1, position));
    velocity = 0;
  }
  if (position < .001 && Math.abs(velocity) < .04) {
    position = velocity = 0;
  }
  return { position, velocity };
}

function nextPaperContact(position, velocity) {
  // The upper group is bounded by its original slot and the resting stack below.
  const floorTime = (-velocity + Math.sqrt(velocity ** 2 + 2 * PAPER_GRAVITY * (1 - position))) / PAPER_GRAVITY;
  const ceilingDiscriminant = velocity ** 2 - 2 * PAPER_GRAVITY * position;
  if (velocity < 0 && ceilingDiscriminant >= 0) {
    return { time: (-velocity - Math.sqrt(ceilingDiscriminant)) / PAPER_GRAVITY, position: 0 };
  }
  return { time: floorTime, position: 1 };
}

function advancePaperGravity(position, velocity, phase, milliseconds) {
  let remaining = milliseconds / 1000;
  // Resolve contact at its exact time, including any remainder of this frame.
  for (let contactCount = 0; contactCount < 4 && phase !== 'open'; contactCount++) {
    const contact = nextPaperContact(position, velocity);
    const seconds = Math.min(remaining, Math.max(0, contact.time));
    position += velocity * seconds + .5 * PAPER_GRAVITY * seconds ** 2;
    velocity += PAPER_GRAVITY * seconds;
    remaining -= seconds;
    if (seconds < contact.time - 1e-9) break;
    position = contact.position;
    if (position === 0) {
      velocity = 0;
    } else if (phase === 'falling' && velocity > .01) {
      phase = 'landing';
      velocity = -Math.min(velocity * PAPER_RESTITUTION, Math.sqrt(2 * PAPER_GRAVITY * PAPER_MAX_REBOUND));
    } else {
      phase = 'open';
      velocity = 0;
    }
    if (remaining <= 1e-9) break;
  }
  return { position: Math.max(0, Math.min(1, position)), velocity, phase };
}

// Native transforms and the controller sample the same trajectory. Include exact
// contact keyframes so interpolation cannot smooth away the moment of landing.
function paperVerticalKeyframes(position, velocity, phase) {
  const values = [position];
  const times = [0];
  let elapsed = 0;
  for (let frame = 0; frame < 200; frame++) {
    if (phase === 'open' || (phase === 'lifting' && position === 0 && velocity === 0)) break;
    const milliseconds = phase === 'lifting' ? 8 : Math.min(8, Math.max(0, nextPaperContact(position, velocity).time * 1000));
    if (phase === 'lifting') {
      ({ position, velocity } = advancePaperLift(position, velocity, milliseconds));
    } else {
      ({ position, velocity, phase } = advancePaperGravity(position, velocity, phase, milliseconds));
    }
    elapsed += milliseconds;
    if (elapsed === times.at(-1)) values[values.length - 1] = position;
    else { times.push(elapsed); values.push(position); }
  }
  return { values, duration: elapsed, offsets: times.map(time => elapsed ? time / elapsed : 0) };
}

// One extracted sheet, one gap, and one latest request. No animation queue.
function createPaperStackMotion({ count, onChange, reducedMotion = false,
  requestFrame = requestAnimationFrame, cancelFrame = cancelAnimationFrame }) {
  let requested = 0;
  let active = 0;
  let pull = 0;
  let elapsed = 0;
  let settle = 0;
  let velocity = 0;
  let verticalPhase = 'falling';
  let frame = null;
  let lastTime = null;

  function getState() {
    const phase = requested !== active ? 'lifting' : !active ? 'rest'
      : pull < 1 ? 'pulling' : verticalPhase;
    return { requested, active, pull, settle, velocity, phase };
  }

  function publish() { onChange(getState()); }

  function cancel() {
    if (frame !== null) cancelFrame(frame);
    frame = null;
    lastTime = null;
  }

  function finishImmediately() {
    cancel();
    active = requested;
    pull = settle = active ? 1 : 0;
    velocity = 0;
    elapsed = active ? PAPER_PULL_DURATION : 0;
    verticalPhase = active ? 'open' : 'falling';
    publish();
  }

  function schedule() {
    if (frame === null) frame = requestFrame(tick);
  }

  function replaceSheet() {
    // Restore instantly only after the old gap has completely reopened.
    active = requested;
    pull = elapsed = settle = 0;
    velocity = 0;
    verticalPhase = 'falling';
  }

  function tick(time) {
    frame = null;
    // Returning from an inactive tab must not seek through an entire motion.
    const delta = lastTime === null ? 0 : Math.min(32, Math.max(0, time - lastTime));
    lastTime = time;
    if (requested !== active) {
      ({ position: settle, velocity } = advancePaperLift(settle, velocity, delta));
      if (settle === 0) replaceSheet();
    }
    if (requested === active && active > 0) {
      if (pull < 1) {
        elapsed = Math.min(PAPER_PULL_DURATION, elapsed + delta);
        pull = 1 - (1 - elapsed / PAPER_PULL_DURATION) ** 3;
      } else {
        ({ position: settle, velocity, phase: verticalPhase } = advancePaperGravity(settle, velocity, verticalPhase, delta));
      }
    }
    publish();
    if (getState().phase === 'rest' || getState().phase === 'open') lastTime = null;
    else schedule();
  }

  function select(index) {
    if (!Number.isInteger(index) || index < 0 || index >= count) return;
    if (requested === index) return;
    requested = index;
    // A reversal starts from the current height and momentum, including a landing.
    if (requested !== active || verticalPhase === 'open') verticalPhase = 'falling';
    if (reducedMotion) return finishImmediately();
    if (settle === 0 && active !== requested) {
      replaceSheet();
      lastTime = null;
    }
    publish();
    if (getState().phase === 'rest') cancel();
    else schedule();
  }

  publish();
  return {
    select, getState, destroy: cancel,
    setReducedMotion(value) {
      reducedMotion = value;
      if (value) finishImmediately();
    },
  };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { createPaperStackMotion, paperVerticalKeyframes, advancePaperGravity, PAPER_PULL_DURATION };
