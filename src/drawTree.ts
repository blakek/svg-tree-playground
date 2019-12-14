export function drawTree(
  distance: number,
  direction = 0,
  iteration = 0
): string {
  // Limit depth based on number of iterations
  if (iteration > 12) {
    return "";
  }

  const angle = (direction * 0.15 + 1.5) * Math.PI;

  // Get the relative coordinates to draw to
  const dx = distance * Math.cos(angle);
  const dy = distance * Math.sin(angle);

  // Decrease the distance for "branches"
  const nextDistance = distance / 1.2;

  // Move back to draw the next set of lines. Skip moving if this is the last
  // set of lines.
  const moveBack = direction === -iteration ? "" : `m${-dx},${-dy}`;

  return `
    l${dx},${dy}
    ${drawTree(nextDistance, direction + 1, iteration + 1)}
    ${drawTree(nextDistance, direction - 1, iteration + 1)}
    ${moveBack}`;
}
