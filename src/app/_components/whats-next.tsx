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
import { containerSizes, defaultContainerPadding } from '@/common/constants';

const Typography = styled(MuiTypography)({
  color: indigo[50],
});

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: `${defaultContainerPadding.xlarge}px 0`,
  },
  background: indigo[800],
  width: '100%',
  padding: '64px 0',
  display: 'flex',
  justifyContent: 'center',
}));
const Description = styled(Typography)({
  marginTop: 3,
  marginBottom: 1,
  width: containerSizes.mobile,
});

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
          <Description variant="subtitle2">
            My inbox is always open. Whether it&apos;s a question or just to say
            hello, I&apos;ll do my best to get back to you.
          </Description>
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
