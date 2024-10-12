'use client';
import { grey, indigo } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
    allVariants: {
      color: indigo[50],
    },
  },
  palette: {
    primary: {
      main: indigo[500],
      contrastText: indigo[50],
    },
    secondary: {
      main: indigo[300],
      contrastText: grey[900],
    },
    tertiary: {
      main: grey[900],
      contrastText: indigo[50],
    },
  },
});

export default theme;
