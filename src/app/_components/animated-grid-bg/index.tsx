import { Box, styled } from '@mui/material';
import Grid from './grid';

const Container = styled(Box)({
  width: 435,
  height: 700,
  overflow: 'hidden',
  zIndex: 2,
});

const AnimatedGridBackground = () => (
  <Container>
    <Grid />
  </Container>
);

export default AnimatedGridBackground;
