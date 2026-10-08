export function computeCustomIndex(data, steps) {
  if (!steps.length) return [];

  return data
    .map((row) => {
      let score = row[steps[0].key];

      for (const step of steps.slice(1)) {
        const value = row[step.key];

        // Never treat missing data as zero.
        if (!Number.isFinite(score) || !Number.isFinite(value)) {
          score = null;
          break;
        }

        if (step.operator === "+") score += value;
        if (step.operator === "-") score -= value;
        if (step.operator === "*") score *= value;
      }

      return { ...row, score };
    })
    .sort((a, b) => {
      if (a.score === null) return 1;
      if (b.score === null) return -1;
      return b.score - a.score;
    });
}
