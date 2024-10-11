import { indigo } from '@mui/material/colors';
import Section from './section';
import {
  styled,
  Typography as MuiTypography,
  IconButton,
  Box,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Typography = styled(MuiTypography)({
  color: indigo[50],
});

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: '36px 0',
  },
  background: indigo[800],
  width: '100%',
  padding: '64px 0',
  display: 'flex',
  justifyContent: 'center',
}));

export const WhatsNext = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView]);

  return (
    <Container>
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.3,
            },
          },
        }}
      >
        <Section height="auto" flexDirection="column">
          <Typography variant="body1">What&apos;s Next?</Typography>
          <Typography variant="h4">
            <b>Get In Touch</b>
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ marginTop: 3, marginBottom: 1, width: '360px' }}
          >
            My inbox is always open. Whether it&apos;s a question or just to say
            hello, I&apos;ll do my best to get back to you.
          </Typography>
          <Link href="mailto:ivy.jeong@gmail.com">
            <IconButton sx={{ color: indigo[50] }}>
              <Email fontSize="large" />
            </IconButton>
          </Link>
        </Section>
      </motion.div>
    </Container>
  );
};

export default WhatsNext;
