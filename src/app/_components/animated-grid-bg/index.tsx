import { Box, styled } from '@mui/material';
import Grid from './grid';

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 110,
  },
  width: 435,
  height: 700,
  overflow: 'hidden',
  zIndex: 2,
}));

const AnimatedGridBackground = () => (
  <Container>
    <Grid />
  </Container>
);

export default AnimatedGridBackground;
