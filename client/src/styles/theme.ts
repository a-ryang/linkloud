import { CSSVariablesResolver, createTheme } from "@mantine/core";

import { linkloudBlue } from "./colors";

const theme = createTheme({
  primaryColor: "linkloudBlue",
  colors: {
    linkloudBlue,
  },
});

export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-color-text": theme.colors.dark["9"],
  },
  light: {
    "--mantine-color-text": theme.colors.dark["9"],
  },
  dark: {
    "--mantine-color-text": theme.colors.dark["0"],
  },
});

export default theme;
