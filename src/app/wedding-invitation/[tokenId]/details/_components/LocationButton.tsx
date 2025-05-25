import { Box, useMediaQuery } from '@mui/material';
import LocationIcon from '../../../_assets/location_icon.png';
import LocationIconSelected from '../../../_assets/location_icon_selected.png';
import { useState } from 'react';
import theme from '@/common/theme';

const LocationButton = () => {
  const [hovering, setHovering] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const iconSize = isMobile ? 20 : 35;
  return (
    <Box sx={{ display: 'inline-block', imageRendering: 'pixelated' }}>
      <a
        href="https://maps.app.goo.gl/AMWDMVdooaePJNoRA"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {hovering ? (
          <img
            src={LocationIconSelected.src}
            alt="Location"
            width={iconSize}
            height={iconSize}
          />
        ) : (
          <img
            src={LocationIcon.src}
            alt="Location"
            width={iconSize}
            height={iconSize}
          />
        )}
      </a>
    </Box>
  );
};

export default LocationButton;
