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
    .select('*, wedding_guest(disabled_fields, show_with_us)')
    .eq('token', params.tokenId);
  const guestId = data?.[0]?.guest_id;
  const disabledFields = data?.[0]?.wedding_guest?.disabled_fields;
  const showWithUs = data?.[0]?.wedding_guest?.show_with_us ?? false;
  return guestId ? (
    <Content
      guestId={guestId}
      disabledFields={disabledFields}
      showWithUs={showWithUs}
    />
  ) : (
    <div>Unauthorized</div>
  );
};

export default WeddingDetailsPage;

export const metadata: Metadata = {
  title: 'Dave & Ivy - Wedding Invitation',
};
