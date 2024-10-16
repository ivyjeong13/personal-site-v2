import { Box, styled } from '@mui/material';
import { DynamicCounter, TotalCounter } from '.';
import { centeredFlexStyles, centeredPositionStyles } from '@/common/styles';
import { grey, indigo } from '@mui/material/colors';
import useCounter from '../_hooks/use-counter';

const SplashMinionCount = styled(Box)(({ theme }) => ({
  ...centeredFlexStyles,
  height: 300,
  paddingRight: theme.spacing(3),
  position: 'absolute',
  right: theme.spacing(3),
  bottom: 524,
  width: 300,
  '&::before': {
    ...centeredPositionStyles,
    aspectRatio: '1/cos(30deg)',
    background: grey[900],
    clipPath: 'polygon(50% -50%,100% 50%,50% 150%,0 50%)',
    content: '""',
    display: 'block',
    height: 240,
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
    transform: 'rotate(22deg)',
  },
}));

type Props = {
  count?: number;
};

const MinionCounter = ({ count }: Props) => {
  const { count: numberToDisplay } = useCounter(count);
  return (
    <SplashMinionCount>
      <DynamicCounter>{numberToDisplay}</DynamicCounter>
      <TotalCounter>
        300 <br /> minions
      </TotalCounter>
    </SplashMinionCount>
  );
};

export default MinionCounter;
