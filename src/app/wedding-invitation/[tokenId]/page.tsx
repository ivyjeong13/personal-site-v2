import { Metadata } from 'next';
import Contents from './_components/Content';

type ParamProps = {
  tokenId: string;
};
const WeddingInvitationPage = ({ params }: { params: ParamProps }) => {
  return <Contents tokenId={params.tokenId} />;
};

/**
 * Credits for:
 * Forest: https://ansimuz.itch.io/
 * 1.5 Adventurer: https://rvros.itch.io/animated-pixel-hero

 * Utilize:
 * Cloudinary for image upload
 * Heroku for Node API Layer and PostgreSQL database
 */

export default WeddingInvitationPage;

export const metadata: Metadata = {
  title: 'Dave & Ivy - Wedding Invitation',
};
