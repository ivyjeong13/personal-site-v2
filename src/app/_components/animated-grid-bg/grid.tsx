import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { indigo } from '@mui/material/colors';
import GridItem from './grid-item';
import { useTheme } from '@mui/material';

type Props = {
  delayPerPixel?: number;
  numItems?: number;
};

const Grid = ({ delayPerPixel = 0.0008, numItems = 80 }: Props) => {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const theme = useTheme();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView]);

  const getBackgroundColor = (currentIndex: number) => {
    const percentage = (currentIndex / numItems) * 100;
    if (percentage < 33) {
      return '#FFF';
    }

    if (percentage < 66) {
      return indigo[100];
    }

    return theme.palette.secondary.main;
  };

  return (
    // We set variants to be an object to force variant propagation - this is a bug
    // with variants and useAnimation()
    // https://github.com/framer/motion/issues/191
    <motion.div ref={ref} initial="hidden" animate={controls} variants={{}}>
      {Array.from({ length: numItems }).map((_, i) => (
        <GridItem
          key={i}
          backgroundColor={getBackgroundColor(i)}
          i={i}
          originIndex={26}
          delayPerPixel={delayPerPixel}
          originOffset={originOffset}
        />
      ))}
    </motion.div>
  );
};

export default Grid;
