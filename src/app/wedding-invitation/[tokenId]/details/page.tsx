import { Metadata } from 'next';
import Content from './_components/Content';

type Props = {
  params: {
    tokenId: string;
  };
};

const WeddingDetailsPage = ({ params }: Props) => {
  return <Content tokenId={params.tokenId} />;
};

export default WeddingDetailsPage;

export const metadata: Metadata = {
  title: 'Dave & Ivy - Wedding Invitation',
};
