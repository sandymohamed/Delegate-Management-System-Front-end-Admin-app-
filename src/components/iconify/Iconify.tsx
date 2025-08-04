// import { forwardRef } from 'react';
// // icons
// import { Icon } from '@iconify/react';
// // @mui
// import { Box } from '@mui/material';

// // ----------------------------------------------------------------------

// type TypeIconify = {
//   sx:object,
//   width: number,
//   icon: String,
// };
// const Iconify = forwardRef(({ icon, width = 20, sx, ...other }:TypeIconify, ref) => (
//   <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
// ));

// export default Iconify;

import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
import { IconifyIcon } from "@iconify/types";

interface IconifyProps {
  icon: string | IconifyIcon;
  sx?: object;
  width?: number;
}

const Iconify = ({ icon, sx, width = 20,  ...other }: IconifyProps) => {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{ width: width, height: width, ...sx }}
      {...other}
    />
  );
};

export default Iconify;
