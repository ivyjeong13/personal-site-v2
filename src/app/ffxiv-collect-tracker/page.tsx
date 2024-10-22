import { Suspense } from 'react';
import Loading from '@/common/components/loading';
import Content from './content';
import { fetchCharacterInfo, fetchCollectionInfo } from './_api';
import { Metadata } from 'next';

const characterId = 36534441;
export async function generateMetadata(): Promise<Metadata> {
  const character = await fetchCharacterInfo(characterId);
  return {
    title: `XIV Completionist - ${character.name}`,
  };
}

const XivCollect = async () => {
  const character = await fetchCharacterInfo(characterId);
  const { mounts, minions } = await fetchCollectionInfo();
  return (
    <Suspense fallback={<Loading />}>
      <Content character={character} mounts={mounts} minions={minions} />
    </Suspense>
  );
};

export default XivCollect;
