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
    .select('*, wedding_guest(disabled_fields)')
    .eq('token', params.tokenId);
  const guestId = data?.[0]?.guest_id;
  const disabledFields = data?.[0]?.wedding_guest?.disabled_fields;
  return guestId ? (
    <Content guestId={guestId} disabledFields={disabledFields} />
  ) : (
    <div>Unauthorized</div>
  );
};

export default WeddingDetailsPage;

export const metadata: Metadata = {
  title: 'Dave & Ivy - Wedding Invitation',
};
