export function getMaxContribution() {
  const year = new Date().getFullYear();

  if (year === 2023) {
    return 22500;
  } else if (year === 2024) {
    return 23000;
  } else if (year === 2025) {
    return 23500;
  }

  return 23000;
}
