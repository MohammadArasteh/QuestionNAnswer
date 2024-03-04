import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiPagination: {
      defaultProps: {
        dir: "ltr",
      },
    },
  },
});

export default theme;
