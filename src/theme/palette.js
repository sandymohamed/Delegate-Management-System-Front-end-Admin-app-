/***************************  DEFAULT / AI THEME - PALETTE  ***************************/

export default function palette() {
  const textPrimary = '#1A1C1E'; // AI/neutral/10 - on surface
  const textSecondary = '#42474E'; // AI/neutral variant/30 - on surface variant
  const divider = '#C2C7CE'; // AI/neutral variant/80 - outline variant
  const background = '#FFF';

  const lightPalette = {
    primary: {
      lighter: '#CCE5FF', // AI/primary/90 - primary container / primary fixed
      light: '#92CCFF', // AI/primary/80 - primary fixed dim
      main: '#006397', // AI/primary/40 - primary
      dark: '#004B73', // AI/primary/30 - on primary fixed variant
      darker: '#001D31' // AI/primary/10 - on primary container / on primary fixed
    },
    secondary: {
      lighter: '#D3E4F8', // AI/secondary/90 - secondary container / secondary fixed
      light: '#B7C8DB', // AI/secondary/80 - secondary fixed dim
      main: '#4F6070', // AI/secondary/40 - secondary
      dark: '#384858', // AI/secondary/30 - on secondary fixed variant
      darker: '#0B1D2B' // AI/secondary/10 - on secondary container / on secondary fixed
    },
    grey: {
      50: '#F9F9FC', // AI/neutral/98 - surface / surface bright
      100: '#F1F4F9', // AI/neutral/96 - surface container low
      200: '#EBEEF3', // AI/neutral/94 - surface container
      300: '#E6E8EE', // AI/neutral/92 - surface container high
      400: '#E2E2E5', // AI/neutral/90 - surface container highest
      500: '#D7DADF', // AI/neutral/87 - surface dim
      600: divider, // AI/neutral variant/80 - outline variant
      700: '#72787E', // AI/neutral variant/50 - outline
      800: textSecondary, // AI/neutral variant/30 - on surface variant
      900: textPrimary // AI/neutral/10 - on surface
    },
    text: {
      primary: textPrimary, // AI/neutral/10 - on surface
      secondary: textSecondary // AI/neutral variant/30 - on surface variant
    },
    divider,
    background: {
      default: background
    }
  };

  return {
    ...lightPalette
  };
}



// ***********************************************************************************************************************
// export default function palette(mode = 'light') {
//   const textPrimary = mode === 'light' ? '#1A1C1E' : '#E0E0E0'; // Light: AI/neutral/10, Dark: Lighter text
//   const textSecondary = mode === 'light' ? '#42474E' : '#A0A0A0'; // Light: AI/neutral variant/30, Dark: Lighter secondary text
//   const divider = mode === 'light' ? '#C2C7CE' : '#42474E'; // Light: AI/neutral variant/80, Dark: Darker divider
//   const background = mode === 'light' ? '#FFF' : '#121212'; // Light: White, Dark: Dark background

//   const lightPalette = {
//     primary: {
//       lighter: '#CCE5FF', // AI/primary/90
//       light: '#92CCFF', // AI/primary/80
//       main: '#006397', // AI/primary/40
//       dark: '#004B73', // AI/primary/30
//       darker: '#001D31' // AI/primary/10
//     },
//     secondary: {
//       lighter: '#D3E4F8', // AI/secondary/90
//       light: '#B7C8DB', // AI/secondary/80
//       main: '#4F6070', // AI/secondary/40
//       dark: '#384858', // AI/secondary/30
//       darker: '#0B1D2B' // AI/secondary/10
//     },
//     grey: {
//       50: '#F9F9FC', // AI/neutral/98
//       100: '#F1F4F9', // AI/neutral/96
//       200: '#EBEEF3', // AI/neutral/94
//       300: '#E6E8EE', // AI/neutral/92
//       400: '#E2E2E5', // AI/neutral/90
//       500: '#D7DADF', // AI/neutral/87
//       600: divider, // AI/neutral variant/80
//       700: '#72787E', // AI/neutral variant/50
//       800: textSecondary, // AI/neutral variant/30
//       900: textPrimary // AI/neutral/10
//     },
//     text: {
//       primary: textPrimary, // Light: AI/neutral/10, Dark: Lighter text
//       secondary: textSecondary // Light: AI/neutral variant/30, Dark: Lighter secondary text
//     },
//     divider,
//     background: {
//       default: background // Light: White, Dark: Dark background
//     }
//   };

//   const darkPalette = {
//     primary: {
//       lighter: '#003352', // Darker version of AI/primary/90
//       light: '#004B73', // Darker version of AI/primary/80
//       main: '#92CCFF', // Lighter version of AI/primary/40
//       dark: '#B7C8DB', // Lighter version of AI/primary/30
//       darker: '#D3E4F8' // Lighter version of AI/primary/10
//     },
//     secondary: {
//       lighter: '#0B1D2B', // Darker version of AI/secondary/90
//       light: '#384858', // Darker version of AI/secondary/80
//       main: '#B7C8DB', // Lighter version of AI/secondary/40
//       dark: '#D3E4F8', // Lighter version of AI/secondary/30
//       darker: '#E0E0E0' // Lighter version of AI/secondary/10
//     },
//     grey: {
//       50: '#121212', // Dark background
//       100: '#1E1E1E', // Dark surface container low
//       200: '#242424', // Dark surface container
//       300: '#2A2A2A', // Dark surface container high
//       400: '#303030', // Dark surface container highest
//       500: '#424242', // Dark surface dim
//       600: divider, // Dark divider
//       700: '#72787E', // Neutral variant/50 (unchanged)
//       800: textSecondary, // Dark secondary text
//       900: textPrimary // Dark primary text
//     },
//     text: {
//       primary: textPrimary, // Light: AI/neutral/10, Dark: Lighter text
//       secondary: textSecondary // Light: AI/neutral variant/30, Dark: Lighter secondary text
//     },
//     divider,
//     background: {
//       default: background // Light: White, Dark: Dark background
//     }
//   };

//   return mode === 'light' ? lightPalette : darkPalette;
// }