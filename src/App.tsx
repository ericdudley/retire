import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DateAdapter from "@date-io/moment";
import Form from "./Form";
import { Typography, Link, Container, Paper, Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import github from "./assets/github.svg";

const theme = createTheme();

export default function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h4" align="center">
              401k Contribution Calculator
            </Typography>
            <Box height="32px" />
            <Typography>
              This calculator is intended to help you calculate the correct 401k
              contribution percentage to hit a target contribution amount by the
              end of the year.
            </Typography>
            <Box height="32px" />
            <Form />
          </Paper>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center">
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {"Copyright © "}
                <Link color="inherit" href="https://ericdudley.com/">
                  Eric Dudley
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
              <a
                href="https://www.github.com/ericdudley/retire"
                target="_blank"
              >
                <img
                  src={github}
                  alt="GitHub"
                  style={{ height: "1.2rem", marginLeft: "0.25rem" }}
                />
              </a>
              <a href="https://www.buymeacoffee.com/ericdudley" target="_blank">
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-violet.png"
                  alt="Buy Me A Coffee"
                  style={{
                    height: "1.2rem",

                    marginLeft: "0.25rem",
                  }}
                />
              </a>
            </Box>

            <Typography variant="body2" color="text.secondary" align="center">
              Disclaimer: Data entered into this calculator will not be
              persisted or sent over the network. This tool was not created by a
              registered investment, legal, or tax advisor. All financial
              information is provided for educational material and should be
              verified for your own circumstances. Although best efforts are
              made to ensure that the information is accurate and up to date,
              unintended errors may occur.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
