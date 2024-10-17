import { Suspense } from 'react';
import Loading from '@/common/components/loading';
import Content from './content';
import { Minion, Mount, XivCharacter } from './_types';

const fetchCharacterInfo = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/character/${id}`;
  const res = await fetch(url);
  const data: XivCharacter = await res.json();
  return data;
};

const fetchCollectionInfo = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/collectable`;
  const res = await fetch(url, { cache: 'no-cache' });
  const data = await res.json();
  const minions: { total: number; results: Minion[] } = data?.minions ?? {
    total: 0,
    results: [],
  };
  const mounts: { total: number; results: Mount[] } = data?.mounts ?? {
    total: 0,
    results: [],
  };
  return { minions, mounts };
};

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
