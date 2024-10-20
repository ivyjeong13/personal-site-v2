import { Suspense } from 'react';
import Loading from '@/common/components/loading';
import Content from './content';
import { fetchCharacterInfo, fetchCollectionInfo } from './_api';

const XivCollect = async () => {
  const characterId = 36534441;
  const character = await fetchCharacterInfo(characterId);
  const { mounts, minions } = await fetchCollectionInfo();
  return (
    <Suspense fallback={<Loading />}>
      <Content character={character} mounts={mounts} minions={minions} />
    </Suspense>
  );
};

export default XivCollect;
