import { Suspense } from 'react';
import Loading from '@/common/components/loading';
import { fetchCharacterInfo, fetchCollectionInfo } from '../_api';
import Content from '../content';

type Props = {
  params: {
    characterId: string;
  };
};

const XivCollectSelectCharacter = async ({ params }: Props) => {
  const character = await fetchCharacterInfo(
    Number.parseInt(params.characterId, 10),
  );
  const { mounts, minions } = await fetchCollectionInfo();
  return (
    <Suspense fallback={<Loading />}>
      <Content character={character} mounts={mounts} minions={minions} />
    </Suspense>
  );
};

export default XivCollectSelectCharacter;
