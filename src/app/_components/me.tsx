import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Section from './section';
import { styled } from '@mui/material';
import { indigo } from '@mui/material/colors';

const Container = styled(motion.div)({
  width: '100%',
  background: indigo[50],
});

export const Me = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    controls.start('visible');
  }, [isInView]);

  return (
    <Container
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: {
          x: 0,
          opacity: 1,
        },
        hidden: {
          x: -1000,
          opacity: 0,
          transition: {
            delay: 1,
          },
        },
      }}
    >
      <Section>ME SECTION.</Section>
    </Container>
  );
};

export default Me;
