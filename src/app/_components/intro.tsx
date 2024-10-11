import { motion } from 'framer-motion';
import { Box, styled, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import Image from 'next/image';
import AnimatedGridBackground from './animated-grid-bg';
import profilePic from '../assets/images/profile_pic.jpg';
import Section from './section';
import {
  black,
  defaultContainerPadding,
  mountainPurple,
} from '../../common/constants';
import useIsMobile from '../../common/hooks/use-is-mobile';

const ProfilePic = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    alignSelf: 'center',
    marginTop: defaultContainerPadding.large,
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
        </motion.div>
      </Section>
    </>
  );
};

export default Intro;
