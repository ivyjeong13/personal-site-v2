import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { defaultContainerPadding } from '@/common/constants';
import useIsMobile from '@/common/hooks/use-is-mobile';
import ImageList from './image-list';
import Section from '../section';

const Container = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: defaultContainerPadding.large,
  },
  width: '100%',
  background: theme.palette.primary.contrastText,
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 48,
  marginTop: 75,
}));

const BackgroundA = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 400,
    height: 400,
    top: 200,
  },
  width: 600,
  height: 600,
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  top: 300,
  transform: 'translateY(-50%) rotate(45deg)',
  right: 0,
}));

const BackgroundB = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    top: 'unset',
    bottom: 200,
  },
  width: 350,
  height: 350,
  backgroundColor: theme.palette.secondary.main,
  position: 'absolute',
  top: 270,
  transform: 'translateY(-50%) rotate(75deg)',
  left: 0,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  marginTop: defaultContainerPadding.large,
  zIndex: 1,
}));

export const Me = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });
  const isMobile = useIsMobile();

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
      <BackgroundA />
      <BackgroundB />
      <Section height="auto" flexDirection="column">
        <Title variant={isMobile ? 'body1' : 'h2'}>
          a{' '}
          <Typography
            component="span"
            color="primary"
            variant={isMobile ? 'h5' : 'h1'}
          >
            <b>tidbit</b>
          </Typography>{' '}
          here & there
        </Title>
        <ImageList />
      </Section>
    </Container>
  );
};

export default Me;
