import { Box, styled, useMediaQuery } from '@mui/material';
import TagTileImage from '../../../_assets/scroll_tag_tile.png';
import TagEndImage from '../../../_assets/scroll_tag_end.png';
import TagStartImage from '../../../_assets/scroll_tag_start.png';
import SquareButtonImage from '../../../_assets/square_button.png';
import { pixelify } from '@/app/wedding-invitation/_fonts';
import { useState } from 'react';
import theme from '@/common/theme';

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
  [theme.breakpoints.down('md')]: {
    opacity: '1 !important',
    left: 'auto',
    bottom: 'auto',
    position: 'relative',
    transform: 'none',
    backgroundColor: 'transparent',
    fontSize: 11,
  },
}));

const Block = styled('button')(({ theme }) => ({
  position: 'relative',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  backgroundImage: `url(${SquareButtonImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  imageRendering: 'pixelated',
  padding: theme.spacing(2),
  flexShrink: 0,
  cursor: 'pointer',
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Tag = ({
  onClick,
  children,
  name,
  selected,
  simple,
}: {
  onClick: () => void;
  children: React.ReactNode;
  name: string;
  selected?: boolean;
  simple?: boolean;
}) => {
  const [hovering, setHovering] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });
  return simple ? (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Block
        className={selected ? 'selected' : ''}
        onClick={onClick}
        onMouseOver={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {children}
        {!isMobile && (
          <TextContainer style={{ opacity: hovering ? 1 : 0 }}>
            {name}
          </TextContainer>
        )}
      </Block>
      {isMobile && (
        <TextContainer style={{ opacity: hovering ? 1 : 0 }}>
          {name}
        </TextContainer>
      )}
    </Box>
  ) : (
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
