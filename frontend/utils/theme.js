import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors: {
    black: "#011627",
    gray: {
      10: "#fdfffc",
      800: "#011627",
    },
    teal: {
      300: "#2ec4b6",
    },
    red: { 500: "#e71d36" },
    orange: { 400: "#ff9f1c" },
  },
  fonts: {
    // heading: "'Open Sans', sans-serif",
    // body: "'Open Sans', sans-serif",
    mono: `'Menlo', monospace`,
  },
  breakpoints,
  config,
});

export default theme;
