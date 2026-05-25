export const ANCHOR_STEP = 5;

/** 0-based indices where in-feed anchor markers appear (0, 4, 9, …). */
export function getAnchorIndices(length: number, step = ANCHOR_STEP): number[] {
  if (length === 0) return [];
  const indices = [0];
  for (let i = step - 1; i < length; i += step) {
    if (i !== 0) indices.push(i);
  }
  return indices;
}

export function isAnchorIndex(index: number, step = ANCHOR_STEP): boolean {
  return index === 0 || (index + 1) % step === 0;
}

/** 1-based label shown on anchors and jump links. */
export function anchorLabel(index: number): number {
  return index + 1;
}
