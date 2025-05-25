import { Metadata } from 'next';
import Content from './_components/Content';
import { createClient } from '@/utils/supabase/server';

type Props = {
  params: {
    tokenId: string;
  };
};

const WeddingDetailsPage = async ({ params }: Props) => {
  const server = await createClient();
  const { data } = await server
    .from('token')
    .select('*')
    .eq('token', params.tokenId);
  const guestId = data?.[0]?.guest_id;
  return guestId ? <Content guestId={guestId} /> : <div>Unauthorized</div>;
};

export default WeddingDetailsPage;

export const metadata: Metadata = {
  title: 'Dave & Ivy - Wedding Invitation',
};
