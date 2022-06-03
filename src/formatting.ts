export const formatMoney = (amount?: number): string => {
  if (amount == null) {
    return "$██";
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
};

export const formatPercentage = (ratio?: number, floor = false): string => {
  if (ratio == null) {
    return "█%";
  }

  const percentage = ratio * 100;

  return `${floor ? Math.floor(percentage) : percentage.toFixed(1)}%`;
};
