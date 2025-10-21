'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Menu from './_components/Menu';
import BackgroundImage from '../_assets/details_bg.png';
import TopScrollImage from '../_assets/scroll_top.png';
import TopScrollMobileImage from '../_assets/scroll_top_mobile.png';
import BottomScrollImage from '../_assets/scroll_bottom.png';
import BottomScrollMobileImage from '../_assets/scroll_bottom_mobile.png';
import FlatTopScrollImage from '../_assets/scroll_top_b.png';
import FlatBottomScrollImage from '../_assets/scroll_bottom_b.png';
import { pixelify } from '../_fonts';
import theme from '@/common/theme';

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100svh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const BackgroundImageContainer = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundImage: `url(${BackgroundImage.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  transition: 'opacity 1000ms ease-in-out',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const TopScroll = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 200,
  backgroundImage: `url(${TopScrollImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  flexShrink: 0,
  [theme.breakpoints.down(1320)]: {
    backgroundImage: `url(${TopScrollMobileImage.src})`,
  },
  [theme.breakpoints.down(1024)]: {
    backgroundSize: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    height: 73,
    maxWidth: 375,
    backgroundImage: `url(${TopScrollMobileImage.src})`,
  },
}));

const BottomScroll = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 200,
  backgroundImage: `url(${BottomScrollImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  flexShrink: 0,
  [theme.breakpoints.down(1320)]: {
    backgroundImage: `url(${TopScrollMobileImage.src})`,
  },
  [theme.breakpoints.down(1024)]: {
    backgroundSize: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    height: 73,
    maxWidth: 375,
    backgroundImage: `url(${BottomScrollMobileImage.src})`,
  },
}));

const ScrollInner = styled(Box)(({ theme }) => ({
  width: 950,
  borderLeft: '13px solid #623a0a',
  borderRight: '13px solid #623a0a',
  position: 'relative',
  flexDirection: 'column',
  display: 'flex',
  flexGrow: 1,
  backgroundColor: '#f7eac8',
  color: '#000',
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  fontSize: 24,
  zIndex: 2,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100% + 26px)',
    height: '100%',
    zIndex: -1,
    backgroundImage: `url(${FlatTopScrollImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    marginLeft: -13,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 'calc(100% + 26px)',
    height: '100%',
    backgroundImage: `url(${FlatBottomScrollImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    zIndex: -1,
    marginLeft: -13,
  },
  [theme.breakpoints.down('md')]: {
    width: 365,
    borderLeft: '4px solid #623a0a',
    borderRight: '4px solid #623a0a',
    '&:before': {
      marginLeft: -4,
      width: 'calc(100% + 8px)',
    },
    '&:after': {
      marginLeft: -4,
      width: 'calc(100% + 8px)',
    },
  },
}));
const ScrollOuter = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 0,
  minHeight: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 1s ease-in-out, min-height 1s ease-in-out',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    '&:before': {
      height: 64,
    },
    '&:after': {
      height: 64,
    },
  },
}));

const ViewContent = styled(Box)(({ theme }) => ({
  borderLeft: '13px solid #e1be88',
  borderRight: '13px solid #e1be88',
  padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'start',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    borderLeft: '4px solid #e1be88',
    borderRight: '4px solid #e1be88',
    padding: theme.spacing(2),
  },
}));

export default function MenuPage() {
  return (
    <Container>
      <BackgroundImageContainer />

      <TopScroll />
      <ScrollOuter
        style={{
          height: 3200,
          maxHeight: 'fit-content',
        }}
        id="scroll-outer"
      >
        <ScrollInner>
          <ViewContent>
            <Menu />
            <Box sx={{ height: theme.spacing(8) }} />
          </ViewContent>
        </ScrollInner>
      </ScrollOuter>
      <BottomScroll />
    </Container>
  );
}
