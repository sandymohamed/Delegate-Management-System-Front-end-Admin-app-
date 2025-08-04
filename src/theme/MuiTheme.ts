// import { createTheme, Theme } from "@mui/material";
// import rtlPlugin from 'stylis-plugin-rtl';
// import { prefixer } from 'stylis';
// import createCache from '@emotion/cache';

// // --------------------------------------------------------------------

// // export const MuiTheme = createTheme({
// //     direction: 'rtl',
// //     typography: {
// //       fontFamily: 'Cairo, sans-serif',
// //     },
// //     typography: {
// //         fontFamily: 'Roboto, Arial, sans-serif',
// //         h1: {
// //           fontSize: '32px',
// //           fontWeight: 700,
// //         },
// //         h2: {
// //           fontSize: '28px',
// //           fontWeight: 600,
// //         },
// //         h3: {
// //           fontSize: '24px',
// //           fontWeight: 500,
// //         },
// //         body1: {
// //           fontSize: '16px',
// //         },
// //         body2: {
// //           fontSize: '14px',
// //         },
// //         caption: {
// //           fontSize: '12px',
// //           fontStyle: 'italic',
// //         },
// //       },
// //       components: {
// //         MuiButton: {
// //           styleOverrides: {
// //             root: {
// //               borderRadius: '8px',
// //               textTransform: 'none',
// //               '&:hover': {
// //                 opacity: 0.9,
// //               },
// //             },
// //             containedPrimary: {
// //               backgroundColor: '#4CAF50',
// //               color: '#FFFFFF',
// //             },
// //             containedSecondary: {
// //               backgroundColor: '#2196F3',
// //               color: '#FFFFFF',
// //             },
// //           },
// //         },
// //         MuiCard: {
// //           styleOverrides: {
// //             root: {
// //               borderRadius: '12px',
// //               boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
// //               padding: '16px',
// //             },
// //           },
// //         },
// //         MuiTooltip: {
// //           styleOverrides: {
// //             tooltip: {
// //               backgroundColor: '#333',
// //               color: '#FFF',
// //               fontSize: '12px',
// //               borderRadius: '4px',
// //             },
// //           },
// //         },
// //         MuiIcon: {
// //           defaultProps: {
// //             fontSize: 'medium',
// //           },
// //         },
// //       },
// //     // palette: {
// //     //   // secondary:{
// //     //   //   main: '#5f5f5f'
// //     //   // },
// //     //   mode: 'dark',
// //     // }

// //   });


// export const MuiTheme: Theme = createTheme({  direction: 'rtl', // Right-to-left layout
//   typography: {
//     fontFamily: 'Cairo, sans-serif', // Arabic-friendly font
//     h1: {
//       fontSize: '32px',
//       fontWeight: 700,
//       color: '#1A1A1A', // Dark gray for headings
//     },
//     h2: {
//       fontSize: '28px',
//       fontWeight: 600,
//       color: '#1A1A1A',
//     },
//     h3: {
//       fontSize: '24px',
//       fontWeight: 500,
//       color: '#1A1A1A',
//     },
//     body1: {
//       fontSize: '16px',
//       color: '#333333', // Slightly lighter gray for body text
//     },
//     body2: {
//       fontSize: '14px',
//       color: '#555555',
//     },
//     caption: {
//       fontSize: '12px',
//       fontStyle: 'italic',
//       color: '#777777', // Light gray for captions
//     },
//   },
//   palette: {
//     mode: 'dark',
//     primary: {
//       // lighter: '#CAFDF5',
//       light: '#61F3F3',
//       main: '#00B8D9',
//       dark: '#006C9C',
//       // darker: '#003768',
//       contrastText: '#fff',
//     },
//     success: {
//       main: '#4CAF50', // Green as primary color
//       contrastText: '#FFFFFF', // White text on primary buttons
//     },
//     secondary: {
//       main: '#9C27B0', // Purple as secondary color
//       contrastText: '#FFFFFF', // White text on secondary buttons
//     },
//     background: {
//       default: '#F5F5F5', // Light gray background
//       paper: '#FFFFFF', // White background for cards
//     },
//     text: {
//       primary: '#1A1A1A', // Dark gray for primary text
//       // light: '#FFF', 
//       secondary: '#555555', // Medium gray for secondary text

//       // primary: rgba(0, 0, 0, 0.87),
//       // secondary: rgba(0, 0, 0, 0.6),
//       disabled:'rgba(41, 39, 39, 0.38)',
//     },
//   },
//   // components: {
//   //   MuiButton: {
//   //     styleOverrides: {
//   //       root: {
//   //         borderRadius: '8px',
//   //         textTransform: 'none', // Disable uppercase transformation
//   //         fontWeight: 500,
//   //         padding: '8px 16px',
//   //         '&:hover': {
//   //           opacity: 0.9,
//   //         },
//   //       },
//   //       containedPrimary: {
//   //         backgroundColor: '#4CAF50', // Green primary button
//   //         color: '#FFFFFF',
//   //       },
//   //       containedSecondary: {
//   //         backgroundColor: '#9C27B0', // Purple secondary button
//   //         color: '#FFFFFF',
//   //       },
//   //       outlinedPrimary: {
//   //         borderColor: '#4CAF50',
//   //         color: '#4CAF50',
//   //       },
//   //       outlinedSecondary: {
//   //         borderColor: '#9C27B0',
//   //         color: '#9C27B0',
//   //       },
//   //     },
//   //   },
//   //   // MuiCard: {
//   //   //   styleOverrides: {
//   //   //     root: {
//   //   //       borderRadius: '12px',
//   //   //       boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
//   //   //       padding: '16px',
//   //   //       backgroundColor: '#FFFFFF', // White background for cards
//   //   //     },
//   //   //   },
//   //   // },
//   //   // MuiTooltip: {
//   //   //   styleOverrides: {
//   //   //     tooltip: {
//   //   //       backgroundColor: '#333333', // Dark gray tooltip
//   //   //       color: '#FFFFFF', // White text in tooltip
//   //   //       fontSize: '12px',
//   //   //       borderRadius: '4px',
//   //   //     },
//   //   //   },
//   //   // },
//   //   // MuiIcon: {
//   //   //   defaultProps: {
//   //   //     fontSize: 'medium',
//   //   //   },
//   //   // },
//   //   // MuiTextField: {
//   //   //   styleOverrides: {
//   //   //     root: {
//   //   //       '& .MuiOutlinedInput-root': {
//   //   //         borderRadius: '8px',
//   //   //         // border: "5px solid primary.main",
//   //   //         // boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)',
//   //   //       },
//   //   //     },
//   //   //   },
//   //   // },
//   //   // MuiAppBar: {
//   //   //   styleOverrides: {
//   //   //     root: {
//   //   //       backgroundColor: '#FFFFFF', // White app bar
//   //   //       color: '#1A1A1A', // Dark gray text
//   //   //       boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
//   //   //     },
//   //   //   },
//   //   // },
//   // },
// });

// // for dark mode
// // export const MuiTheme = createTheme({
// //   direction: 'rtl', // Right-to-left layout
// //   typography: {
// //     fontFamily: 'Cairo, sans-serif', // Arabic-friendly font
// //     h1: {
// //       fontSize: '32px',
// //       fontWeight: 700,
// //       color: '#FFFFFF', // White for headings in dark mode
// //     },
// //     h2: {
// //       fontSize: '28px',
// //       fontWeight: 600,
// //       color: '#FFFFFF',
// //     },
// //     h3: {
// //       fontSize: '24px',
// //       fontWeight: 500,
// //       color: '#FFFFFF',
// //     },
// //     body1: {
// //       fontSize: '16px',
// //       color: '#E0E0E0', // Light gray for body text in dark mode
// //     },
// //     body2: {
// //       fontSize: '14px',
// //       color: '#B0B0B0', // Slightly lighter gray for secondary text
// //     },
// //     caption: {
// //       fontSize: '12px',
// //       fontStyle: 'italic',
// //       color: '#9E9E9E', // Light gray for captions
// //     },
// //   },
// //   palette: {
// //     mode: 'dark', // Enable dark mode

// //   },
// //   components: {
// //     MuiButton: {
// //       styleOverrides: {
// //         root: {
// //           borderRadius: '8px',
// //           textTransform: 'none', // Disable uppercase transformation
// //           fontWeight: 500,
// //           padding: '8px 16px',
// //           '&:hover': {
// //             opacity: 0.9,
// //           },
// //         },
// //         containedPrimary: {
// //           backgroundColor: '#4CAF50', // Green primary button
// //           color: '#FFFFFF',
// //         },
// //         containedSecondary: {
// //           backgroundColor: '#9C27B0', // Purple secondary button
// //           color: '#FFFFFF',
// //         },
// //         outlinedPrimary: {
// //           borderColor: '#4CAF50',
// //           color: '#4CAF50',
// //         },
// //         outlinedSecondary: {
// //           borderColor: '#9C27B0',
// //           color: '#9C27B0',
// //         },
// //       },
// //     },
// //     MuiCard: {
// //       styleOverrides: {
// //         root: {
// //           borderRadius: '12px',
// //           boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Darker shadow for dark mode
// //           padding: '16px',
// //           backgroundColor: '#1E1E1E', // Dark background for cards
// //         },
// //       },
// //     },
// //     MuiTooltip: {
// //       styleOverrides: {
// //         tooltip: {
// //           backgroundColor: '#424242', // Dark gray tooltip
// //           color: '#FFFFFF', // White text in tooltip
// //           fontSize: '12px',
// //           borderRadius: '4px',
// //         },
// //       },
// //     },
// //     MuiIcon: {
// //       defaultProps: {
// //         fontSize: 'medium',
// //       },
// //     },
// //     MuiTextField: {
// //       styleOverrides: {
// //         root: {
// //           '& .MuiOutlinedInput-root': {
// //             borderRadius: '8px',
// //             backgroundColor: '#1E1E1E', // Dark background for text fields
// //           },
// //           '& .MuiInputLabel-root': {
// //             color: '#B0B0B0', // Light gray for labels
// //           },
// //           '& .MuiOutlinedInput-input': {
// //             color: '#E0E0E0', // Light gray for input text
// //           },
// //         },
// //       },
// //     },
// //     MuiAppBar: {
// //       styleOverrides: {
// //         root: {
// //           backgroundColor: '#1E1E1E', // Dark background for app bar
// //           color: '#FFFFFF', // White text
// //           boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Darker shadow
// //         },
// //       },
// //     },
// //     MuiDivider: {
// //       styleOverrides: {
// //         root: {
// //           backgroundColor: '#424242', // Dark gray for dividers
// //         },
// //       },
// //     },
// //   },
// // });

//   export const cacheRtl = createCache({
//     key: 'muirtl',
//     stylisPlugins: [prefixer, rtlPlugin],
//   });
