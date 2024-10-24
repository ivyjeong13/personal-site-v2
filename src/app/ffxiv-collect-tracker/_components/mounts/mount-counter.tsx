import { centeredFlexStyles, centeredPositionStyles } from '@/common/styles';
import { Box, styled } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import { useContext } from 'react';
import CollectablesContext from '../../_context/collectables';
import { DynamicCounter, TotalCounter } from '..';
import useCounter from '../../_hooks/use-counter';

const SplashMountCount = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    bottom: 'unset',
    right: 'unset',
    height: 150,
    width: 150,
    padding: 0,
    '&::before': {
      height: '150px !important',
    },
    '&::after': {
      left: '75px !important',
    },
  },
  ...centeredFlexStyles,
  height: 300,
  paddingRight: theme.spacing(3),
  position: 'absolute',
  right: theme.spacing(3),
  bottom: 200,
  width: 300,
  '&::before': {
    ...centeredPositionStyles,
    aspectRatio: 1,
    background: grey[900],
    clipPath: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
    content: '""',
    display: 'block',
    height: 300,
    zIndex: 0,
  },
  '&::after': {
    position: 'absolute',
    top: 0,
    left: 150,
    background: indigo[50],
    display: 'block',
    content: '""',
    width: 2,
    height: '100%',
    transform: 'rotate(25deg)',
  },
}));

const MountCounter = () => {
  const { character, totalMounts } = useContext(CollectablesContext);
  const total = totalMounts ?? '??';
  const currentCollected = character?.total_mounts ?? 0;
  const { count: numberToDisplay } = useCounter(currentCollected);
  return (
    <SplashMountCount>
      <DynamicCounter>{numberToDisplay}</DynamicCounter>
      <TotalCounter>
        {total} <br /> mounts
      </TotalCounter>
    </SplashMountCount>
  );
};

export default MountCounter;
