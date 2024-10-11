import { Box, Button, Link, styled, Typography } from '@mui/material';
import { indigo } from '@mui/material/colors';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { motion, useScroll } from 'framer-motion';
import {
  black,
  standardGap,
  defaultInputPadding,
} from '../../common/constants';
import { centeredFlexStyles } from '@/common/styles';

const HeaderContainer = styled(Box)({
  color: indigo[50],
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
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: standardGap,
});

const NameIcon = styled(Typography)({
  ...centeredFlexStyles,
  borderRadius: '50%',
  width: 45,
  height: 45,
  padding: 1,
  backgroundColor: indigo[500],
  cursor: 'pointer',
});

const ProgressBar = styled(motion.div)({
  position: 'fixed',
  top: 62,
  left: 0,
  right: 0,
  height: 10,
  background: indigo[500],
  tranformOrigin: '0%',
  zIndex: 4,
});

const ResumeButton = styled(Button)({
  color: indigo[300],
  borderColor: indigo[300],
});

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
              <ResumeButton variant="outlined">Resume</ResumeButton>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/ivy-jeong-0582ba95/"
            >
              <LinkedInIcon sx={{ color: indigo[300] }} fontSize="large" />
            </Link>
          </HeaderSection>
        </HeaderContent>
      </HeaderContainer>
      <ProgressBar style={{ scaleX: scrollYProgress }} />
    </>
  );
};

export default Header;
