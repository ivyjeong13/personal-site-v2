import { styled } from '@mui/material';
import TagTileImage from '../../../_assets/scroll_tag_tile.png';
import TagEndImage from '../../../_assets/scroll_tag_end.png';
import TagStartImage from '../../../_assets/scroll_tag_start.png';
import { pixelify } from '@/app/wedding-invitation/_fonts';
import { useState } from 'react';

const TagContainer = styled('button')(({ theme }) => ({
  position: 'relative',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  backgroundImage: `url(${TagTileImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  imageRendering: 'pixelated',
  padding: theme.spacing(1),
  cursor: 'pointer',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: -64,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${TagEndImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    zIndex: -1,
  },
  '& > img:hover': {
    animation: 'bounce 1s ease-in-out infinite',
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
  '&.selected': {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: -80,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${TagStartImage.src})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      zIndex: -1,
    },
  },
}));

const TextContainer = styled('p')(({ theme }) => ({
  fontFamily: pixelify.style.fontFamily,
  fontSize: 20,
  color: '#000',
  textAlign: 'center',
  transition: 'opacity 0.3s ease-in-out',
  position: 'absolute',
  left: '50%',
  bottom: -24,
  transform: 'translateX(-50%)',
  textWrap: 'nowrap',
  backgroundColor: '#e1bd8e',
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  borderRadius: theme.spacing(1),
  zIndex: 2,
}));

const Tag = ({
  onClick,
  children,
  name,
  selected,
}: {
  onClick: () => void;
  children: React.ReactNode;
  name: string;
  selected?: boolean;
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <TagContainer
      className={selected ? 'selected' : ''}
      onClick={onClick}
      onMouseOver={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
      <TextContainer style={{ opacity: hovering ? 1 : 0 }}>
        {name}
      </TextContainer>
    </TagContainer>
  );
};

export default Tag;
