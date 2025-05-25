import ExitIcon from '../../../_assets/fa3.png';
import ExitIconSelected from '../../../_assets/fa3_selected.png';
import { styled } from '@mui/material';
import { pixelify } from '../../../_fonts';
import { useState } from 'react';

const Container = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  left: theme.spacing(2),
  width: 65,
  height: 65,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  zIndex: 9999,
  '& > img': {
    imageRendering: 'pixelated',
    width: 65,
    height: 65,
  },
  [theme.breakpoints.down('md')]: {
    top: theme.spacing(1),
    left: theme.spacing(1),
    width: 48,
    height: 48,
    '& > img': {
      width: 48,
      height: 48,
    },
    position: 'fixed',
  },
}));

const TextContainer = styled('p')(({ theme }) => ({
  fontFamily: pixelify.style.fontFamily,
  fontSize: 18,
  color: '#fdd179',
  textAlign: 'center',
  transition: 'opacity 0.3s ease-in-out',
  position: 'absolute',
  left: 92,
  top: 32,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  zIndex: 9999,
  [theme.breakpoints.down('md')]: {
    left: 64,
    top: 24,
    fontSize: 12,
    padding: theme.spacing(0.5),
    position: 'fixed',
  },
}));

const ExitButton = ({ onClick }: { onClick: () => void }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <>
      <Container
        onClick={onClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {hovering ? (
          <img src={ExitIconSelected.src} alt="Exit" />
        ) : (
          <img src={ExitIcon.src} alt="Mute Off" />
        )}
      </Container>
      <TextContainer style={{ opacity: hovering ? 1 : 0 }}>
        Return Outside
      </TextContainer>
    </>
  );
};

export default ExitButton;
