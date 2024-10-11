import { Box, styled } from '@mui/material';
import Grid from './grid';
import useIsMobile from '@/common/hooks/use-is-mobile';

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

const AnimatedGridBackground = () => {
  const isMobile = useIsMobile();
  return (
    <Container>
      {isMobile ? <Grid numItems={86} /> : <Grid numItems={42} />}
    </Container>
  );
};

export default AnimatedGridBackground;
