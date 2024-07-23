import { mode } from "@chakra-ui/theme-tools";
import { Colors, extendTheme, StyleProps, ThemeConfig } from "@chakra-ui/react";

export const colors: Colors = {
  primary: {
    500: "#633CFF",
    300: "#BEADFF",
    100: "#EFEBFF",
    50: "#E3D7FF",
  },

  secondary: {
    500: "#FF3939",
  },

  light: {
    50: "#FAFAFA",
    100: "#D9D9D9",
    500: "#737373",
  },

  dark: {
    500: "#333333",
  },

  white: {
    500: "#FFFFFF",
  },

  error: {
    500: "#FF3939",
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleProps) => ({
    body: {
      bg: mode("light.50", "dark.500")(props),
      color: "dark.500",
      fontVariant: "normal",
    },
  }),
};

const customTheme = extendTheme({
  colors,
  config,
  styles,
});

export default customTheme;
