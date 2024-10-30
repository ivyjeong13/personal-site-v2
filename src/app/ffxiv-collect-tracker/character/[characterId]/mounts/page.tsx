import { Suspense } from 'react';
import Loading from '@/common/components/loading';
import { Metadata } from 'next';
import { fetchCharacterInfo, fetchMountInfo } from '../../../_api';
import Content from './content';

export const metadata: Metadata = {
  title: 'XIV Completionist - Mounts',
  description: 'List of mounts collected and to be collected in FFXIV.',
};

const MountPage = async ({ params }: { params: { characterId: number } }) => {
  const character = await fetchCharacterInfo(params.characterId);
  const mounts = await fetchMountInfo();
  return (
    <Suspense fallback={<Loading />}>
      <Content character={character} mounts={mounts} />
    </Suspense>
  );
};

export default MountPage;
