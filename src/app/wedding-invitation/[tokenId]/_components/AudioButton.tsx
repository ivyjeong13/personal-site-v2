import theme from '@/common/theme';
import MuteOff from '../../_assets/mute_off_icon.png';
import MuteOn from '../../_assets/mute_on_icon.png';
import { styled } from '@mui/material';

const Container = styled('button')({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  width: 35,
  height: 35,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  zIndex: 10,
  '& > img': {
    imageRendering: 'pixelated',
  },
});

const AudioButton = ({
  audioMuted,
  onChange,
}: {
  audioMuted: boolean;
  onChange: (muted: boolean) => void;
}) => {
  return (
    <Container
      onClick={() => {
        const updatedMuted = !audioMuted;
        localStorage.setItem('audioMuted', updatedMuted ? 'true' : 'false');
        onChange(updatedMuted);
      }}
    >
      {!audioMuted ? (
        <img src={MuteOff.src} alt="Mute Off" width={35} height={35} />
      ) : (
        <img src={MuteOn.src} alt="Mute On" width={35} height={35} />
      )}
    </Container>
  );
};

export default AudioButton;
