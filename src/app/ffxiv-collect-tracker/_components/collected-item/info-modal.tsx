import {
  Box,
  ClickAwayListener,
  Portal,
  styled,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { Minion, Mount } from '../../_types';
import { grey, indigo } from '@mui/material/colors';
import { BodyText, BoldBodyText } from '..';
import { centeredPositionStyles } from '@/common/styles';
import { cinzel } from '../../_fonts';

type Props = {
  item: Minion | Mount;
  onClose: () => void;
};

const OverlayBackground = styled(Box)({
  backgroundColor: 'rgba(0, 0, 0, 0.90)',
  height: '100vh',
  left: 0,
  position: 'fixed',
  top: 0,
  width: '100%',
});

const Content = styled(Box)(({ theme }) => ({
  ...centeredPositionStyles,
  backgroundColor: grey[900],
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(2),
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  width: '80%',
  maxWidth: 500,
}));

const InfoTitle = styled(Typography)({
  fontFamily: cinzel.style.fontFamily,
  fontSize: 20,
  fontWeight: 600,
  lineHeight: 0.85,
});

const InfoModal = ({ item, onClose }: Props) => {
  const { image, name, enhanced_description, description } = item;

  const handleOnClose = (event: MouseEvent | TouchEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Portal>
      <OverlayBackground>
        <ClickAwayListener onClickAway={handleOnClose}>
          <Content>
            <Image alt={name} src={image} height={192} width={192} />
            <InfoTitle>{name}</InfoTitle>
            <BoldBodyText>{description}</BoldBodyText>
            <BodyText>{enhanced_description}</BodyText>
          </Content>
        </ClickAwayListener>
      </OverlayBackground>
    </Portal>
  );
};

export default InfoModal;
