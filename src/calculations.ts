import moment from "moment";

export type PaycheckFrequency =
  | "weekly"
  | "bi-weekly"
  | "monthly"
  | "semi-monthly";

export const getRemainingPaychecks = (
  paycheckFrequency?: PaycheckFrequency,
  lastPaycheckDate?: Date
): number => {
  if (paycheckFrequency == null || lastPaycheckDate == null) {
    return 0;
  }

  const lastPaycheckMoment = moment(lastPaycheckDate);
  let remainingPaychecks = 0;

  if (lastPaycheckMoment.year() < moment().year()) {
    return getTotalPaychecks(paycheckFrequency);
  } else if (lastPaycheckMoment.year() > moment().year()) {
    return 0;
  }

  if (paycheckFrequency === "weekly") {
    remainingPaychecks = (365 - lastPaycheckMoment.dayOfYear()) / 7;
  } else if (paycheckFrequency === "bi-weekly") {
    remainingPaychecks = (365 - lastPaycheckMoment.dayOfYear()) / 14;
  } else if (paycheckFrequency === "monthly") {
    remainingPaychecks = 12 - (lastPaycheckMoment.month() + 1);
  } else if (paycheckFrequency === "semi-monthly") {
    const months = 12 - (lastPaycheckMoment.month() + 1);
    const daysInMonth = lastPaycheckMoment.daysInMonth();
    const dayOfMonth = lastPaycheckMoment.date();
    remainingPaychecks =
      months * 2 + (dayOfMonth >= Math.floor(daysInMonth / 2) ? 0 : 1);
  }

  return Math.floor(remainingPaychecks);
};

export const getTotalPaychecks = (
  paycheckFrequency: PaycheckFrequency
): number => {
  if (paycheckFrequency === "weekly") {
    return 52;
  }
  if (paycheckFrequency === "bi-weekly") {
    return 26;
  }
  if (paycheckFrequency === "monthly") {
    return 12;
  }
  if (paycheckFrequency === "semi-monthly") {
    return 24;
  }

  return 0;
};

export const getRemainingContribution = (
  ytdContribution?: number,
  targetContribution?: number
): number | undefined => {
  if (ytdContribution == null || targetContribution == null) {
    return undefined;
  }

  return targetContribution - ytdContribution;
};

export const getPaycheckAmount = (
  annualSalary?: number,
  paycheckFrequency?: PaycheckFrequency
): number | undefined => {
  if (annualSalary == null || paycheckFrequency == null) {
    return undefined;
  }

  const paycheckAmount = annualSalary / getTotalPaychecks(paycheckFrequency);
  return paycheckAmount;
};

export const getContributionPerPaycheck = (
  remainingPaychecks?: number,
  remainingContribution?: number
): number | undefined => {
  if (remainingPaychecks == null || remainingContribution == null) {
    return undefined;
  }

  return remainingContribution / remainingPaychecks;
};

export const getContributionPercentagePerPaycheck = (
  remainingPaychecks?: number,
  remainingContribution?: number,
  paycheckAmount?: number
) => {
  if (
    remainingPaychecks == null ||
    remainingContribution == null ||
    paycheckAmount == null
  ) {
    return undefined;
  }

  return remainingContribution / remainingPaychecks / paycheckAmount;
};
