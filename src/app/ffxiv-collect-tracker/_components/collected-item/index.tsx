import Image from 'next/image';
import { Minion, Mount } from '../../_types';
import { useState } from 'react';
import InfoModal from './info-modal';
import { styled } from '@mui/material';

type Props = {
  item: Minion | Mount;
};

const CollectedItemImage = styled(Image)({
  '&:hover': {
    opacity: 1,
  },
  cursor: 'pointer',
  opacity: 0.65,
});

const CollectedItem = ({ item }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const { name, icon } = item;
  return (
    <>
      <CollectedItemImage
        alt={name}
        onClick={() => setShowDialog(true)}
        src={icon}
        height={40}
        width={40}
      />
      {showDialog && (
        <InfoModal item={item} onClose={() => setShowDialog(false)} />
      )}
    </>
  );
};

export default CollectedItem;
