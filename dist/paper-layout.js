// Layout and extraction are independent of the shared gravity controller.
function paperStackGeometry(width, count) {
  const compact = width < 700;
  const narrow = width < 420;
  const paperHeight = narrow ? 340 : 360;
  const a = narrow ? .8 : .84;
  const b = narrow ? -.2 : -.28;
  const c = narrow ? .3 : .55;
  const d = narrow ? .78 : .62;
  const step = narrow ? 36 : compact ? 26 : 24;
  const depth = step * (count - 1);
  const clearance = 20;
  const slope = c / d;
  // Wide layouts retain their original width and rightward clearance formula.
  // Compact layouts use the available width for the paper, then extract below.
  const fittedWidth = compact
    ? (width - 32 - c * paperHeight) / a
    : (width - 32 - c * paperHeight - slope * depth - clearance) / (2 * a - slope * b);
  const paperWidth = Math.min(narrow ? 250 : 300, fittedWidth);
  const projectedWidth = a * paperWidth + c * paperHeight;
  const pull = compact ? 0 : (a - slope * b) * paperWidth + slope * depth + clearance;
  const left = (width - projectedWidth - pull) / 2;
  const top = -b * paperWidth;
  const projectedHeight = top + d * paperHeight;
  const sceneHeight = projectedHeight + step * count + 16;
  // Every extracted sheet parks at the same height, including the bottom sheet.
  const readingTop = sceneHeight + clearance;
  const openHeight = compact ? readingTop + projectedHeight + step + 16 : sceneHeight;
  return { width, compact, narrow, paperWidth, paperHeight, a, b, c, d, step,
    pull, left, top, projectedWidth, projectedHeight, sceneHeight, readingTop, openHeight };
}

function paperStackDisplacement(geometry, index, active, pull, settle) {
  const extracted = index === active && active > 0;
  return {
    x: extracted && !geometry.compact ? geometry.pull * pull : 0,
    y: extracted && geometry.compact ? (geometry.readingTop - index * geometry.step) * pull
      : index < active ? geometry.step * settle : 0,
  };
}

// Translation excludes the sheet's original offset/slot. Reading the correct
// axis before a resize or interruption preserves normalized animation progress.
function paperStackPose(geometry, active, x, y, topY) {
  if (!active) return { pull: 0, settle: 0 };
  const clamp = value => Math.max(0, Math.min(1, value));
  return {
    pull: clamp(geometry.compact ? y / (geometry.readingTop - active * geometry.step) : x / geometry.pull),
    settle: clamp(topY / geometry.step),
  };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { paperStackGeometry, paperStackDisplacement, paperStackPose };
