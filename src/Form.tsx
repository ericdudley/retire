import { Box, Divider, InputAdornment, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import numberToWords from "number-to-words";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {
  PaycheckFrequency,
  getRemainingPaychecks,
  getRemainingContribution,
  getContributionPerPaycheck,
  getContributionPercentagePerPaycheck,
  getPaycheckAmount,
} from "./calculations";
import { formatMoney, formatPercentage } from "./formatting";
import { Percentage } from "./Percentage";
import { DatePicker } from "@mui/x-date-pickers";
import { getMaxContribution } from "./constants";

export default function Form() {
  // Form fields
  const [annualSalary, setAnnualSalary] = React.useState<number | undefined>();
  const [lastPaycheckDate, setLastPaycheckDate] = React.useState<
    Date | undefined
  >(new Date());
  const [paycheckFrequency, setPaycheckFrequency] =
    React.useState<PaycheckFrequency>("bi-weekly");
  const [ytdContribution, setYtdContribution] = React.useState<
    number | undefined
  >(0);
  const [targetContribution, setTargetContribution] = React.useState<
    number | undefined
  >(getMaxContribution());

  // Calculated fields
  const paycheckAmount = getPaycheckAmount(annualSalary, paycheckFrequency);
  const remainingPaychecks = getRemainingPaychecks(
    paycheckFrequency,
    lastPaycheckDate
  );
  const remainingContribution = getRemainingContribution(
    ytdContribution,
    targetContribution
  );
  const contributionPerPaycheck = getContributionPerPaycheck(
    remainingPaychecks,
    remainingContribution
  );
  const contributionPercentagePerPaycheck =
    getContributionPercentagePerPaycheck(
      remainingPaychecks,
      remainingContribution,
      paycheckAmount
    );

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Paycheck information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <TextField
            id="annual-salary"
            label="Annual Salary"
            fullWidth
            autoComplete="transaction-amount"
            value={annualSalary ?? ""}
            helperText={
              paycheckAmount
                ? `${formatMoney(paycheckAmount)} per paycheck`
                : " "
            }
            onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "") {
                setAnnualSalary(undefined);
              } else if (!isNaN(value)) {
                setAnnualSalary(value);
              }
            }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            label="Last Paycheck Date"
            renderInput={(params) => (
              <TextField
                helperText="The date of the last paycheck you received."
                fullWidth
                {...params}
              />
            )}
            value={lastPaycheckDate}
            onChange={(value) => {
              setLastPaycheckDate(value ? value : undefined);
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="paycheck-frequency"
            select
            label="Paycheck Frequency"
            fullWidth
            value={paycheckFrequency}
            helperText={`${remainingPaychecks} remaining paychecks in the year.`}
            onChange={(e) =>
              setPaycheckFrequency(e.target.value as PaycheckFrequency)
            }
          >
            <MenuItem key="weekly" value="weekly">
              Weekly
            </MenuItem>
            <MenuItem key="bi-weekly" value="bi-weekly">
              Bi-Weekly
            </MenuItem>
            <MenuItem key="monthly" value="monthly">
              Monthly
            </MenuItem>
            <MenuItem key="semi-monthly" value="semi-monthly">
              Semi-Monthly
            </MenuItem>
          </TextField>
        </Grid>
      </Grid>
      <Box height={16} />
      <Typography variant="h6" gutterBottom>
        Retirement contribution
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="target-contribution"
            label="Target 401k Contribution"
            fullWidth
            autoComplete="transaction-amount"
            value={targetContribution}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "") {
                setTargetContribution(undefined);
              } else if (!isNaN(value)) {
                setTargetContribution(value);
              }
            }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            helperText={`Note: The annual maximum for ${new Date().getFullYear()} is $${getMaxContribution()}.`}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="ytd-contribution"
            label="Year-to-date 401k Contribution"
            fullWidth
            autoComplete="transaction-amount"
            value={ytdContribution}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (e.target.value === "") {
                setYtdContribution(undefined);
              } else if (!isNaN(value)) {
                setYtdContribution(value);
              }
            }}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            helperText="The total amount contributed to your 401k since the beginning of the year, get this from your last paystub."
          />
        </Grid>
      </Grid>
      <Box marginTop={2}>
        <Typography gutterBottom>
          To hit your target contribution of {formatMoney(targetContribution)},
          you must contribute {formatMoney(remainingContribution)} before the
          end of the year. With {numberToWords.toWords(remainingPaychecks)}{" "}
          paychecks remaining, you should contribute{" "}
          {formatMoney(contributionPerPaycheck)} per paycheck.
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Percentage percentage={contributionPercentagePerPaycheck} />
        <Typography variant="caption">
          Note: If your target contribution is the annual maximum, it is
          recommended to round down to{" "}
          {formatPercentage(contributionPercentagePerPaycheck, true)} to avoid
          over-contributing.
        </Typography>
      </Box>
    </React.Fragment>
  );
}
