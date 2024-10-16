import { Suspense } from 'react';
import Content from './content';
import { XivCharacter } from './_types';
import Loading from '@/common/components/loading';

const XivCollect = async () => {
  const characterId = 36534441;
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/ffxiv/character/${characterId}`;
  const res = await fetch(url, { cache: 'no-store' });
  const data: XivCharacter = await res.json();
  return (
    <Suspense fallback={<Loading />}>
      <Content character={data} />
    </Suspense>
  );
};

export default XivCollect;
