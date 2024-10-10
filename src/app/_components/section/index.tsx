import { Box, styled } from '@mui/material';

type Props = {
  children: React.ReactNode;
  gap?: number;
  height?: number | 'auto';
  width?: number;
  flexDirection?: 'row' | 'column';
};

const Container = styled(Box)({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
});

const Section = ({
  children,
  width = 1200,
  height = 700,
  gap = 0,
  flexDirection = 'row',
}: Props) => (
  <Container sx={{ maxWidth: width, height, gap, flexDirection }}>
    {children}
  </Container>
);

export default Section;
