import theme from '@/common/theme';
import MuteOff from '../../_assets/mute_off_icon.png';
import MuteOn from '../../_assets/mute_on_icon.png';
import MuteOnSelected from '../../_assets/mute_on_selected_icon.png';
import MuteOffSelected from '../../_assets/mute_off_selected_icon.png';
import { styled } from '@mui/material';
import { pixelify } from '../../_fonts';
import { useState, useEffect } from 'react';

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
  zIndex: 9999,
  WebkitTapHighlightColor: 'transparent',
  touchAction: 'manipulation',
  '& > img': {
    imageRendering: 'pixelated',
  },
});

const TextContainer = styled('p')(({ theme }) => ({
  fontFamily: pixelify.style.fontFamily,
  fontSize: 18,
  color: '#fdd179',
  textAlign: 'center',
  transition: 'opacity 0.3s ease-in-out',
  position: 'absolute',
  top: theme.spacing(1.5),
  right: 56,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  zIndex: 9999,
  [theme.breakpoints.down('md')]: {
    fontSize: 12,
    top: theme.spacing(2.25),
  },
}));

const AudioButton = ({
  audioMuted,
  onChange,
}: {
  audioMuted: boolean;
  onChange: (muted: boolean) => void;
}) => {
  const [hovering, setHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsTouchDevice('ontouchstart' in window);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const updatedMuted = !audioMuted;
    localStorage.setItem('audioMuted', updatedMuted ? 'true' : 'false');
    onChange(updatedMuted);
  };

  return (
    <>
      <Container
        onClick={!isTouchDevice ? handleClick : undefined}
        onTouchStart={isTouchDevice ? handleClick : undefined}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {!audioMuted && hovering ? (
          <img
            src={MuteOffSelected.src}
            alt="Mute Off"
            width={35}
            height={35}
          />
        ) : !audioMuted ? (
          <img src={MuteOff.src} alt="Mute Off" width={35} height={35} />
        ) : audioMuted && hovering ? (
          <img src={MuteOnSelected.src} alt="Mute On" width={35} height={35} />
        ) : (
          <img src={MuteOn.src} alt="Mute On" width={35} height={35} />
        )}
      </Container>
      <TextContainer style={{ opacity: hovering ? 1 : 0 }}>
        {audioMuted ? 'Turn on Sound' : 'Turn off Sound'}
      </TextContainer>
    </>
  );
};

export default AudioButton;
