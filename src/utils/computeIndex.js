export function computeCustomIndex(data, weights) {
  const keys = Object.keys(weights).filter(k => weights[k] > 0);
  const total = keys.reduce((s, k) => s + weights[k], 0) || 1;
  return data.map(row => {
    const score = keys.reduce((s, k) => s + (row[k] ?? 0) * weights[k], 0) / total;
    return { ...row, score };
  }).sort((a, b) => b.score - a.score);
}
