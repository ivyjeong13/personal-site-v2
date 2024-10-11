'use client';
import { Box, styled } from '@mui/material';
import Loading from './_components/loading';
import { useEffect, useState } from 'react';
import Intro from './_components/intro';
import About from './_components/about';
import Projects from './_components/projects';
import Me from './_components/me';
import WhatsNext from './_components/whats-next';
import Header from '../common/components/header';

const Segment = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  display: 'flex',
  justifyContent: 'center',
}));

//https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors
export default function Home() {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowContent(true);
    }, 5200);
  }, []);

  return (
    <Box sx={{ paddingTop: '96px' }}>
      {showContent ? (
        <>
          <Header />
          <Segment>
            <Intro />
          </Segment>
          <Segment>
            <About />
          </Segment>
          <Segment>
            <Projects />
          </Segment>
          <Segment>
            <Me />
          </Segment>
          <Segment>
            <WhatsNext />
          </Segment>
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
}
