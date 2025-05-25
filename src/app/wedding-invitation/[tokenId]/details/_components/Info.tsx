import { jacquard24 } from '@/app/wedding-invitation/_fonts';
import { styled } from '@mui/material';

const Title = styled('h2')({
  fontSize: 128,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
});

const Info = () => {
  return (
    <>
      <Title>Wedding Details</Title>
    </>
  );
};

export default Info;
