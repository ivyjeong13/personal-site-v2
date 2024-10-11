import { Box, styled } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { centeredFlexStyles } from '@/common/styles';
import { iconSizes, standardGap } from '../../common/constants';

const Loader = styled(motion.div)({
  background: '#FFF',
  width: iconSizes.small,
  height: iconSizes.small,
});
const Root = styled(Box)({
  ...centeredFlexStyles,
  width: '100%',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
});
const Container = styled(motion.div)({
  display: 'flex',
  alignItems: 'center',
  gap: standardGap,
});

const Loading = () => (
  <Root>
    <Container
      animate={{
        opacity: [1, 0],
      }}
      transition={{
        delay: 5,
      }}
    >
      <Loader
        animate={{
          backgroundColor: [
            grey[50],
            indigo.A200,
            grey[50],
            indigo.A200,
            grey[50],
          ],
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ['0%', '0%', '50%', '50%', '0%'],
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: 1,
        }}
      />
      <motion.div
        animate={{
          display: ['none', 'block'],
          opacity: [0, 1],
        }}
        initial={{
          opacity: 0,
          display: 'none',
        }}
        transition={{
          delay: 4,
        }}
      >
        Welcome...
      </motion.div>
    </Container>
  </Root>
);

export default Loading;
