import {
  Box,
  Button,
  Link as MuiLink,
  styled,
  Typography,
} from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion, useScroll } from 'framer-motion';
import { centeredFlexStyles } from '@/common/styles';
import { GithubIcon } from '@/app/_assets/icons';
import { black, standardGap, defaultInputPadding } from '../constants';

const HeaderContainer = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: 72,
  background: black,
  zIndex: 4,
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 10,
});

const HeaderContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: defaultInputPadding.medium,
  },
  maxWidth: 1200,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

const HeaderSection = styled(Box)({
  ...centeredFlexStyles,
  gap: standardGap,
});

const NameIcon = styled(Typography)(({ theme }) => ({
  ...centeredFlexStyles,
  borderRadius: '50%',
  width: 45,
  height: 45,
  padding: 1,
  backgroundColor: theme.palette.primary.main,
  cursor: 'pointer',
}));

const ProgressBar = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  top: 62,
  left: 0,
  right: 0,
  height: 10,
  background: theme.palette.primary.main,
  tranformOrigin: '0%',
  zIndex: 4,
}));

const Link = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const Header = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <HeaderSection>
            <NameIcon
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
              variant="h6"
            >
              <b>ihj</b>
            </NameIcon>
          </HeaderSection>
          <HeaderSection>
            <Link
              target="_blank"
              href="https://docs.google.com/document/d/1tKNdHoq0m8O7U-5V_z4QE5V1N0BM4Z8llLPyebQRgv8/edit?usp=sharing"
            >
              <Button color="secondary" variant="outlined">
                Resume
              </Button>
            </Link>
            <Link
              target="_blank"
              href="https://github.com/ivyjeong13?tab=repositories"
            >
              <GithubIcon fontSize="medium" />
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/ivy-jeong-0582ba95/"
            >
              <LinkedInIcon fontSize="medium" />
            </Link>
          </HeaderSection>
        </HeaderContent>
      </HeaderContainer>
      <ProgressBar style={{ scaleX: scrollYProgress }} />
    </>
  );
};

export default Header;
