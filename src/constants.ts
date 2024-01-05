export function getMaxContribution() {
  const year = new Date().getFullYear();

  if (year === 2023) {
    return 22500;
  } else if (year === 2024) {
    return 23000;
  }

  return 23000;
}
