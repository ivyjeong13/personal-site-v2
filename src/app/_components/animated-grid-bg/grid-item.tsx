import { defaultInputPadding, standardBorderRadius } from '@/common/constants';
import { styled } from '@mui/material';
import { motion } from 'framer-motion';
import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { desktopSquarePixels, mobileSquarePixels } from './constants';

type Props = {
  backgroundColor?: string;
  delayPerPixel: number;
  i: number;
  originIndex: number;
  originOffset: MutableRefObject<{
    top: number;
    left: number;
  }>;
};

const GridBox = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: mobileSquarePixels,
    width: mobileSquarePixels,
    margin: defaultInputPadding.small,
  },
  margin: 10,
  display: 'inline-block',
  height: desktopSquarePixels,
  width: desktopSquarePixels,
  borderRadius: standardBorderRadius,
}));

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: (delayRef: MutableRefObject<number>) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: delayRef.current },
  }),
};

const GridItem = ({
  backgroundColor = '#FFF',
  delayPerPixel,
  i,
  originIndex,
  originOffset,
}: Props) => {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef<HTMLDivElement>(null);

  // The measurement for all elements happens in the layoutEffect cycle
  // This ensures that when we calculate distance in the effect cycle
  // all elements have already been measured
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [delayPerPixel]);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [delayPerPixel]);

  return (
    <GridBox
      ref={ref}
      variants={itemVariants}
      custom={delayRef}
      sx={{ backgroundColor }}
    />
  );
};

export default GridItem;
