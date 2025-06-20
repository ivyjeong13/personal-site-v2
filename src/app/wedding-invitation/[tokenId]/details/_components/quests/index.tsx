import { jacquard24, pixelify } from '@/app/wedding-invitation/_fonts';
import theme from '@/common/theme';
import { styled } from '@mui/material';

const Title = styled('h2')(({ theme }) => ({
  fontSize: 128,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 64,
  },
}));

const Subtitle = styled('p')(({ theme }) => ({
  fontSize: 24,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  marginTop: theme.spacing(2),
  maxWidth: 640,
  alignSelf: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
}));

const ClosedQuests = styled('div')(({ theme }) => ({
  backgroundColor: '#e1bd8e',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(1),
  '& p + p': {
    marginTop: theme.spacing(0.5),
    fontSize: 18,
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 16,
    '& > p + p': {
      fontSize: 12,
    },
  },
}));

const Quests = () => {
  return (
    <>
      <Title sx={{ marginTop: theme.spacing(4) }}>Journal Log</Title>
      <Subtitle>
        What is a classic RPG without quests? The day of festivities will
        include various quests to complete. For the adventurous lady or sire
        that completes the most, they will be rewarded with a prize.
      </Subtitle>

      <ClosedQuests sx={{ marginBottom: theme.spacing(8) }}>
        <p>
          <i>The journal log is currently inactive.</i>
        </p>
        <p>Check back closer to the day of the event!</p>
      </ClosedQuests>
    </>
  );
};

export default Quests;
