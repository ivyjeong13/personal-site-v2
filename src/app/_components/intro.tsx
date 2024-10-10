import { motion } from 'framer-motion';
import { Box, Button, Link, styled, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import ArticleIcon from '@mui/icons-material/Article';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AnimatedGridBackground from './animated-grid-bg';
import Image from 'next/image';
import profilePic from '../assets/images/profile_pic.jpg';
import Section from './section';
import { black, mountainPurple, standardContainerPadding } from '../_constants';
import useIsMobile from '../_hooks/use-is-mobile';

const ProfilePic = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    alignSelf: 'center',
    marginTop: standardContainerPadding,
  },
  alignSelf: 'flex-end',
  borderRadius: '50%',
  border: `3px solid ${indigo[300]}`,
  height: 150,
  overflow: 'hidden',
  width: 150,
  '& > img': {
    filter: 'grayscale(100%)',
    height: '100%',
    width: '100%',
  },
}));

const bgRadius = '40%';
const BackgroundA = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 700,
  },
  position: 'absolute',
  width: '100%',
  height: 850,
  background: black,
  borderTopRightRadius: 0,
  borderBottomRightRadius: bgRadius,
  borderBottomLeftRadius: bgRadius,
  borderTopLeftRadius: 0,
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 0,
}));

const BackgroundB = styled(Box)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: mountainPurple,
  top: 0,
  left: 0,
  zIndex: -1,
});

const ResumeButton = styled(Button)({
  backgroundColor: indigo[500],
});

const Intro = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <AnimatedGridBackground />
      <BackgroundA />
      <BackgroundB />
      <Section width={765} height="auto">
        <motion.div
          animate={{
            opacity: [0, 1],
          }}
          initial={{
            opacity: 0,
          }}
          transition={{
            delay: 0.5,
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ProfilePic>
            <Image alt="profile_pic.jpg" src={profilePic} />
          </ProfilePic>
          <Typography variant={isMobile ? 'h5' : 'h3'}>hello there,</Typography>
          <Typography variant={isMobile ? 'h3' : 'h1'}>
            i&apos;m <b style={{ color: indigo[300] }}>Ivy Jeong</b>
          </Typography>
          <Typography
            sx={{ textAlign: 'right' }}
            variant={isMobile ? 'h5' : 'h3'}
          >
            senior web developer
          </Typography>

          <Typography
            sx={{ paddingTop: '48px' }}
            variant={isMobile ? 'body2' : 'body1'}
          >
            A full-stack web developer with passion in <br /> creating awesome
            products for awesome users.
          </Typography>

          <Typography
            sx={{ padding: '16px 0' }}
            variant={isMobile ? 'body2' : 'body1'}
          >
            Located in Maryland, USA.
          </Typography>

          <Box sx={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
            <Link
              target="_blank"
              href="https://docs.google.com/document/d/1tKNdHoq0m8O7U-5V_z4QE5V1N0BM4Z8llLPyebQRgv8/edit?usp=sharing"
            >
              <ResumeButton endIcon={<ArticleIcon />} variant="contained">
                Resume
              </ResumeButton>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/ivy-jeong-0582ba95/"
            >
              <LinkedInIcon sx={{ color: indigo[500] }} fontSize="large" />
            </Link>
          </Box>
        </motion.div>
      </Section>
    </>
  );
};

export default Intro;
