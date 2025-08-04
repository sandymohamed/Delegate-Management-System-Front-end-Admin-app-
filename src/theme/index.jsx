import PropTypes from "prop-types";

import { useMemo } from "react";
import { CacheProvider } from "@emotion/react";

// @mui
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
// @project
import palette from "./palette";
import componentsOverride from "./overrides";
import typography from "./typography";

/*************************** DEFAULT / AI THEME - MAIN ***************************/
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin, prefixer],
});

// ----------------------------------------------------------------------
export default function ThemeCustomization({ children }) {
  const mode = "light";

  const themePalette = useMemo(() => palette(mode), []);

  let themeDefault = createTheme({
    direction: "rtl",
    spacing: 4, // Change from default 8 to 4 (halves the spacing)
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 1024,
        lg: 1266,
        xl: 1440,
      },
    },
    palette: {
      mode,
      ...themePalette
    },
  });

  // create duplicate theme due to responsive typography and fontFamily
  let theme = createTheme({
    ...themeDefault,
    typography: typography(themeDefault),
  });

  theme.components = componentsOverride(theme);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider {...{ theme }}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

ThemeCustomization.propTypes = { children: PropTypes.any };
