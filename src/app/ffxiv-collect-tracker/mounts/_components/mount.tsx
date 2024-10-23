import { Box } from '@mui/material';
import Image from 'next/image';
import { BodyText, TitleBodyText } from '../../_components';
import { Mount } from '../../_types';

const MountListItem = ({ mount }: { mount: Mount }) => (
  <Box sx={{ display: 'flex' }}>
    <Box>
      <Image alt={mount.name} height={120} width={120} src={mount.image} />
    </Box>
    <Box>
      <TitleBodyText>{mount.name}</TitleBodyText>
      <BodyText variant="caption">{mount.tooltip}</BodyText>
    </Box>
  </Box>
);

export default MountListItem;
