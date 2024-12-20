import { Minion, Mount, XivCharacter } from '../_types';

export const fetchCharacterInfo = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/character/${id}`;
  const res = await fetch(url);
  const data: XivCharacter = await res.json();
  return data;
};

export const fetchCollectionInfo = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/collectable`;
  const res = await fetch(url);
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

export const fetchMountInfo = async () => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/collectable/mount`;
  const res = await fetch(url);
  const data = await res.json();
  const mounts: { total: number; results: Mount[] } = data?.mounts ?? {
    total: 0,
    results: [],
  };
  return mounts;
};
