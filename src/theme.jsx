import { createTheme } from "@mui/material";

export const theme = createTheme({
  // Custom
  components: {
    MuiTextField: {
      defaultProps: {},
    },
    MuiModal: {
      styleOverrides: {
        backdrop: {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,

      //Custom
      mobile: 428,
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Rubik, sans-serif",
    },
  },
});
