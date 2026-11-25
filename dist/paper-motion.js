const PAPER_PULL_DURATION = 440;

function advancePaperSettle(position, velocity, target, milliseconds) {
  const seconds = milliseconds / 1000;
  const omega = 36;
  const error = position - target;
  const coefficient = velocity + omega * error;
  const decay = Math.exp(-omega * seconds);
  position = target + (error + coefficient * seconds) * decay;
  velocity = (velocity - omega * coefficient * seconds) * decay;
  if (position < 0 || position > 1) {
    position = Math.max(0, Math.min(1, position));
    velocity = 0;
  }
  if (Math.abs(position - target) < .001 && Math.abs(velocity) < .04) {
    position = target;
    velocity = 0;
  }
  return { position, velocity };
}

// The browser can interpolate this trajectory on the compositor, without frame-by-frame styles.
function paperSettleKeyframes(position, velocity, target) {
  const values = [position];
  while ((position !== target || velocity !== 0) && values.length < 60) {
    ({ position, velocity } = advancePaperSettle(position, velocity, target, 16));
    values.push(position);
  }
  return { values, duration: (values.length - 1) * 16 };
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
  let frame = null;
  let lastTime = null;

  function getState() {
    const phase = requested !== active ? 'lifting' : !active ? 'rest'
      : pull < 1 ? 'pulling' : settle < 1 ? 'settling' : 'open';
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
    publish();
  }

  function schedule() {
    if (frame === null) frame = requestFrame(tick);
  }

  function liftOrSettle(target, milliseconds) {
    // Exact critically damped motion, retaining velocity when a request reverses.
    // A bounded one-sheet displacement cannot move the pile below its base.
    const next = advancePaperSettle(settle, velocity, target, milliseconds);
    settle = next.position;
    velocity = next.velocity;
  }

  function replaceSheet() {
    // Restore instantly only after the old gap has completely reopened.
    active = requested;
    pull = elapsed = 0;
    velocity = 0;
  }

  function tick(time) {
    frame = null;
    // Returning from an inactive tab must not seek through an entire motion.
    const delta = lastTime === null ? 0 : Math.min(32, Math.max(0, time - lastTime));
    lastTime = time;
    if (requested !== active) {
      liftOrSettle(0, delta);
      if (settle === 0) replaceSheet();
    }
    if (requested === active && active > 0) {
      if (pull < 1) {
        elapsed = Math.min(PAPER_PULL_DURATION, elapsed + delta);
        pull = 1 - (1 - elapsed / PAPER_PULL_DURATION) ** 3;
      } else {
        liftOrSettle(1, delta);
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

if (typeof module !== 'undefined' && module.exports) module.exports = { createPaperStackMotion, paperSettleKeyframes, PAPER_PULL_DURATION };
