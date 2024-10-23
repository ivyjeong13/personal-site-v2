import { Box, styled, Typography } from '@mui/material';
import { cinzel, thasadith } from '../_fonts';

export const HeaderBodyText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 24,
  },
  fontFamily: cinzel.style.fontFamily,
  fontSize: 42,
  fontWeight: 600,
  lineHeight: 0.85,
})) as typeof Typography;

export const BodyText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 14,
  },
  fontFamily: thasadith.style.fontFamily,
  fontWeight: 400,
})) as typeof Typography;

export const BoldBodyText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 14,
  },
  fontFamily: thasadith.style.fontFamily,
  fontWeight: 700,
})) as typeof Typography;

export const TitleBodyText = styled(Typography)({
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 400,
}) as typeof Typography;

export const DynamicCounter = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 48,
    top: 18,
    minWidth: 85,
  },
  fontFamily: cinzel.style.fontFamily,
  fontSize: 94,
  fontWeight: 600,
  position: 'absolute',
  top: 40,
  left: -8,
  minWidth: 160,
  textAlign: 'right',
}));

export const TotalCounter = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 16,
    right: -12,
  },
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 400,
  fontSize: 24,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: 24,
}));

export const OverlayBackground = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.90)',
  height: '100vh',
  left: 0,
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 3,
});
