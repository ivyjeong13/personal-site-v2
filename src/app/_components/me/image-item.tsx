import { smallContainerPadding } from '@/app/_constants';
import useIsMobile from '@/app/_hooks/use-is-mobile';
import {
  Box,
  ClickAwayListener,
  ImageListItem,
  Portal,
  Tooltip,
  Typography,
} from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
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

const ImageItem = ({ item }: Props) => {
  const [showBlurb, setShowBlurb] = useState(false);
  const isMobile = useIsMobile();
  const boxShadow = `
    1px 2px 2px hsl(220deg 60% 50% / 0.2),
    2px 4px 4px hsl(220deg 60% 50% / 0.2),
    4px 8px 8px hsl(220deg 60% 50% / 0.2),
    8px 16px 16px hsl(220deg 60% 50% / 0.2),
    16px 32px 32px hsl(220deg 60% 50% / 0.2)
  `;

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
          boxShadow,
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
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.90)',
              padding: '24px',
              color: indigo[50],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              zIndex: 2,
            }}
          >
            <ClickAwayListener onClickAway={() => setShowBlurb(false)}>
              <Image width={360} alt={item.description} src={item.img ?? ''} />
            </ClickAwayListener>
            <Typography sx={{ marginTop: 2, maxWidth: 300 }} variant="caption">
              {item.description}
            </Typography>
          </Box>
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
            color: indigo[50],
          },
        },
        tooltip: {
          sx: {
            backgroundColor: indigo[50],
            color: grey[900],
            fontSize: 14,
            padding: `${smallContainerPadding}px`,
            borderRadius: 4,
            border: `2px solid ${grey[900]}`,
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
