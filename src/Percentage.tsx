import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { formatPercentage } from "./formatting";

interface PercentageProps {
  percentage: number | undefined;
}

export const Percentage: FunctionComponent<PercentageProps> = ({
  percentage,
}) => {
  const gatedPercentage =
    percentage == undefined
      ? undefined
      : percentage < 0
      ? 0
      : percentage > 1
      ? 1
      : percentage;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5">Recommended contribution</Typography>
      {percentage != undefined && percentage > 1 && (
        <Typography sx={{ marginBottom: 1 }} color="error">
          Your salary is not high enough to reach your target contribution
          before the end of the year.
        </Typography>
      )}
      {percentage != undefined && percentage <= 0 && (
        <Typography sx={{ marginBottom: 1 }}>
          You have already reached your target contribution!
        </Typography>
      )}
      <Box
        width="128px"
        height="128px"
        borderRadius="50%"
        sx={{
          width: "128px",
          height: "128px",
          borderRadius: "50%",
          backgroundColor: "secondary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color="white">
          {formatPercentage(gatedPercentage)}
        </Typography>
      </Box>
    </Box>
  );
};
