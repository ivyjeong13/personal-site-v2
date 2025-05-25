import { jacquard24, pixelify } from '@/app/wedding-invitation/_fonts';
import { centeredFlexStyles } from '@/common/styles';
import { styled } from '@mui/material';

const Title = styled('h2')({
  fontSize: 128,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
});

const Subtitle = styled('p')(({ theme }) => ({
  fontSize: 24,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  marginTop: theme.spacing(2),
  maxWidth: 640,
  alignSelf: 'center',
}));

const ClosedQuests = styled('div')(({ theme }) => ({
  backgroundColor: '#e1bd8e',
  padding: theme.spacing(2),
  textAlign: 'center',
  marginTop: theme.spacing(4),
  borderRadius: theme.spacing(1),
  '& p + p': {
    marginTop: theme.spacing(0.5),
  },
}));

const Quests = () => {
  return (
    <>
      <Title>Journal Log</Title>
      <Subtitle>
        What is a classic RPG without quests? The day of festivities will
        include various quests to complete. For the adventurous lady or sire
        that completes the most, they will be rewarded with a prize.
      </Subtitle>

      <ClosedQuests>
        <p>
          <i>The journal log is currently inactive.</i>
        </p>
        <p style={{ fontSize: 18 }}>
          Check back closer to the day of the event!
        </p>
      </ClosedQuests>
    </>
  );
};

export default Quests;
