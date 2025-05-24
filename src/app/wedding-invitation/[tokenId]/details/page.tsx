import { Metadata } from 'next';
import Details from './_components/Details';

type Props = {
  params: {
    tokenId: string;
  };
};

const WeddingDetailsPage = ({ params }: Props) => {
  return <Details tokenId={params.tokenId} />;
};

export default WeddingDetailsPage;

export const metadata: Metadata = {
  title: 'Dave & Ivy - Wedding Invitation',
};
