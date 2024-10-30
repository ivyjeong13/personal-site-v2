import { GithubIcon } from '@/common/assets/icons';
import { Box, styled } from '@mui/material';
import Link from 'next/link';
import { cinzel } from '../../_fonts';

const Container = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  position: 'relative',
  width: '100%',
  '&::before': {
    content: '""',
    top: `-${theme.spacing(1)}`,
    left: 0,
    width: '100%',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))',
    height: theme.spacing(1),
  },
}));

const Me = styled(Link)({
  fontFamily: cinzel.style.fontFamily,
});

const Footer = () => (
  <Container>
    <Link
      href="https://github.com/ivyjeong13/personal-site-v2/tree/master/src/app/ffxiv-collect-tracker"
      title="Link to Ivy's Github page."
    >
      <GithubIcon />
    </Link>
    <Me href="/">Ivy Jeong</Me>
  </Container>
);

export default Footer;
