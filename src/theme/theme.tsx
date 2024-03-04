import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiPagination: {
      defaultProps: {
        dir: "ltr",
      },
    },
  },
});
