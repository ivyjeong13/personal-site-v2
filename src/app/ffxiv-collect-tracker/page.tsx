import { Suspense } from 'react';
import Loading from '@/common/components/loading';
import Content from './content';
import { fetchCharacterInfo, fetchCollectionInfo } from './_api';
import { Metadata } from 'next';
import { DEFAULT_CHARACTER_ID } from './_constants';

export async function generateMetadata(): Promise<Metadata> {
  const character = await fetchCharacterInfo(DEFAULT_CHARACTER_ID);
  return {
    title: `XIV Completionist - ${character.name}`,
  };
}

const XivCollect = async () => {
  const character = await fetchCharacterInfo(DEFAULT_CHARACTER_ID);
  const { mounts, minions } = await fetchCollectionInfo();
  return (
    <Suspense fallback={<Loading />}>
      <Content character={character} mounts={mounts} minions={minions} />
    </Suspense>
  );
};

export default XivCollect;
