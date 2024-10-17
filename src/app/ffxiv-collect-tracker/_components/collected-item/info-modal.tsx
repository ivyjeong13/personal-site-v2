import { Box, Portal, styled } from '@mui/material';
import Image from 'next/image';
import { Minion, Mount } from '../../_types';
import { indigo } from '@mui/material/colors';
import { BodyText, BoldBodyText } from '..';
import { centeredPositionStyles } from '@/common/styles';

type Props = {
  item: Minion | Mount;
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
  backgroundColor: indigo[50],
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(2),
  position: 'absolute',
}));

const InfoModal = ({ item }: Props) => {
  const { image, name, enhanced_description, description } = item;
  return (
    <Portal>
      <OverlayBackground>
        <Content>
          <Image alt={name} src={image} height={192} width={192} />
          <BoldBodyText color="tertiary">{name}</BoldBodyText>
          <BodyText color="tertiary">{description}</BodyText>
          <BodyText color="tertiary">{enhanced_description}</BodyText>
        </Content>
      </OverlayBackground>
    </Portal>
  );
};

export default InfoModal;
