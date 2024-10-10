import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Section from '../section';
import { Box, styled, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const ProjectDescription = styled(Typography)({
  color: grey[900],
});

const Project = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      style={{ width: '100%' }}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 1,
          },
        },
      }}
    >
      <Section height="auto" gap={2}>
        <Box
          sx={{
            width: '100%',
            height: 275,
            border: '1px solid black',
          }}
        >
          image
        </Box>
        <Box sx={{ width: '100%' }}>
          <ProjectDescription variant="body1">
            [under construction].
          </ProjectDescription>
        </Box>
      </Section>
    </motion.div>
  );
};

export default Project;
