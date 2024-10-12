'use client';

import { centeredFlexStyles } from '@/common/styles';
import { Box, styled, Typography } from '@mui/material';

const Container = styled(Box)({
  ...centeredFlexStyles,
  height: '100vh',
  width: '100%',
});

const Tamaigatchi = () => {
  return (
    <Container>
      <Typography variant="subtitle2">Under construction.</Typography>
    </Container>
  );
};

/**
 * Credits for:
 * Sprites:
 *    Free Popup Emotes Pack: https://pipoya.itch.io/free-popup-emotes-pack
 *    Pixel Food: https://henrysoftware.itch.io/pixel-food
 *    Cozy People Asset Pack: https://shubibubi.itch.io/cozy-people
 *    Backgrounds: https://craftpix.net/freebies
 *
 * Utilize:
 * Cloudinary for image upload
 * Heroku for Node API Layer and PostgreSQL database
 */

export default Tamaigatchi;
