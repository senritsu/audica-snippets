export const diamond = (center, radius) => {
  const [cx, cy] = center;
  const r = radius;
  return `M ${cx} ${cy + r} L ${cx + r} ${cy} L ${cx} ${cy - r} L ${cx -
    r} ${cy} Z`;
};
