import { defaultBoxShadow, defaultContainerPadding } from '@/common/constants';
import useIsMobile from '@/common/hooks/use-is-mobile';
import { centeredFlexStyles } from '@/common/styles';
import {
  Box,
  ClickAwayListener,
  ImageListItem,
  Portal,
  styled,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

type ImageItemType = {
  rows: number;
  cols: number;
  img?: StaticImageData;
  description: string;
};

type Props = {
  item: ImageItemType;
};

const Overlay = styled(Box)({
  ...centeredFlexStyles,
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.90)',
  padding: defaultContainerPadding.large,
  flexDirection: 'column',
  zIndex: 10,
});

const ImageItem = ({ item }: Props) => {
  const [showBlurb, setShowBlurb] = useState(false);
  const isMobile = useIsMobile();
  const theme = useTheme();

  const ImageContent = (
    <motion.div
      style={{ width: 'inherit', height: 'inherit' }}
      whileHover={{
        opacity: 1,
      }}
      initial={{ opacity: 0.85 }}
    >
      <Image
        onClick={() => setShowBlurb(!showBlurb)}
        style={{
          borderRadius: '4px',
          boxShadow: defaultBoxShadow,
          cursor: 'pointer',
        }}
        src={item.img ?? ''}
        alt="image_item"
        fill
      />
    </motion.div>
  );

  return isMobile ? (
    <>
      <ImageListItem cols={item.cols} rows={item.rows}>
        {ImageContent}
      </ImageListItem>
      {showBlurb && (
        <Portal>
          <Overlay>
            <ClickAwayListener
              onClickAway={(event) => {
                event.preventDefault();
                setShowBlurb(false);
              }}
            >
              <Image
                width={360}
                alt={`${item.img}, description: ${item.description}`}
                src={item.img ?? ''}
              />
            </ClickAwayListener>
            <Typography sx={{ marginTop: 2, maxWidth: 300 }} variant="caption">
              {item.description}
            </Typography>
          </Overlay>
        </Portal>
      )}
    </>
  ) : (
    <Tooltip
      arrow
      title={item.description}
      placement="bottom"
      slotProps={{
        arrow: {
          sx: {
            color: theme.palette.primary.contrastText,
          },
        },
        tooltip: {
          sx: {
            backgroundColor: theme.palette.primary.contrastText,
            color: theme.palette.tertiary.main,
            fontSize: 14,
            padding: `${defaultContainerPadding.medium}px`,
            borderRadius: 4,
            border: `2px solid ${theme.palette.tertiary.main}`,
          },
        },
      }}
    >
      <ImageListItem cols={item.cols} rows={item.rows}>
        {ImageContent}
      </ImageListItem>
    </Tooltip>
  );
};

export default ImageItem;
