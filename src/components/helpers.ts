export const numDownvotes = (score: number, ratio: number) => {
    if (score === 0 || ratio === 0.5) {
      return { ups: 0, downs: 0 };
    }
    const ups = Math.round((score * ratio) / (2 * ratio - 1));
    const downs = ups - score;
    return { ups, downs };
  };