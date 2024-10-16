import { styled, Typography } from '@mui/material';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({
  weight: ['400', '600'],
  subsets: ['latin'],
});

export const DynamicCounter = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 48,
    top: 18,
    minWidth: 75,
    left: -8,
  },
  fontFamily: cinzel.style.fontFamily,
  fontSize: 94,
  fontWeight: 600,
  position: 'absolute',
  top: 40,
  left: 0,
  minWidth: 145,
  textAlign: 'right',
}));

export const TotalCounter = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 16,
  },
  fontFamily: cinzel.style.fontFamily,
  fontWeight: 400,
  fontSize: 24,
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  right: -12,
}));
