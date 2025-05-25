'use client';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useRef } from 'react';

import MedievalTown from './_assets/HighResolution_MedievalTown1.png';
import GuardImage from './_assets/Warrior_Jonath.png';
import { jacquard24, pixelify } from './_fonts';
import theme from '@/common/theme';

const Guard = styled('div')(({ theme }) => ({
  width: 500,
  height: 500,
  backgroundImage: `url(${GuardImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  position: 'absolute',
  zIndex: -1,
  left: 0,
  bottom: 150,
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    bottom: 150,
    width: 300,
    height: 300,
  },
}));

export default function Home() {
  const [audioMuted] = useState(
    typeof window !== 'undefined' &&
      localStorage.getItem('audioMuted') === 'true',
  );
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGuardClick = () => {
    if (audioRef.current && !audioMuted) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play();
    }
  };

  return (
    <Box
      sx={{
        width: '100svw',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        imageRendering: 'pixelated',
        backgroundImage: `url(${MedievalTown.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dwnebujkh/video/upload/v1748472859/stoprightthere_mlvh72.mp3"
        preload="auto"
      />
      <Box
        sx={{
          width: '100%',
          height: 600,
          position: 'absolute',
          bottom: 0,
          left: 0,
          [theme.breakpoints.down('md')]: {
            height: 300,
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 'calc(75svw - 20px)',
            color: '#000',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            [theme.breakpoints.down('md')]: {
              width: '100%',
              padding: theme.spacing(1),
            },
          }}
        >
          <Guard onClick={handleGuardClick} />
          <Box
            sx={{
              backgroundColor: '#FAF5E9',
              borderRadius: 2,
              border: '4px solid #b9a689',
              fontSize: 52,
              fontFamily: jacquard24.style.fontFamily,
              fontWeight: 400,
              padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
              display: 'flex',
              flexDirection: 'column',
              marginBottom: theme.spacing(2),
              width: 'calc(100% - 460px)',
              justifySelf: 'end',
              [theme.breakpoints.down('md')]: {
                fontSize: 32,
                width: '100%',
                marginBottom: theme.spacing(0.5),
              },
            }}
          >
            Imperial Watchman
          </Box>
          <Box
            sx={{
              backgroundColor: '#FAF5E9',
              borderRadius: 2,
              border: '4px solid #b9a689',
              fontSize: 28,
              fontFamily: pixelify.style.fontFamily,
              fontWeight: 400,
              padding: theme.spacing(4),
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing(2),
              [theme.breakpoints.down('md')]: {
                fontSize: 18,
                padding: theme.spacing(2),
              },
            }}
          >
            <p>Stop right there, criminal scum!</p>
            <p>
              Unless you have an invitation from the lord and lady, these
              grounds are off limits!
            </p>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
