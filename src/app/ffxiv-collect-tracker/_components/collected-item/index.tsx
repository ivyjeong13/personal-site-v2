import Image from 'next/image';
import { Minion, Mount } from '../../_types';
import { useState } from 'react';
import InfoModal from './info-modal';

type Props = {
  item: Minion | Mount;
};

const CollectedItem = ({ item }: Props) => {
  const [showDialog, setShowDialog] = useState(false);
  const { name, icon } = item;
  return (
    <>
      <Image
        alt={name}
        onClick={() => setShowDialog(true)}
        src={icon}
        height={40}
        width={40}
      />
      {showDialog && <InfoModal item={item} />}
    </>
  );
};

export default CollectedItem;
