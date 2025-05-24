'use client';

import { Box, styled } from '@mui/material';
import TopScrollImage from '../../../_assets/scroll_top.png';
import BottomScrollImage from '../../../_assets/scroll_bottom.png';
import FlatTopScrollImage from '../../../_assets/scroll_top_b.png';
import FlatBottomScrollImage from '../../../_assets/scroll_bottom_b.png';
import { useEffect, useRef, useState } from 'react';
import { jacquard24, pixelify } from '../../../_fonts';
import BackgroundImage from '../../../_assets/details_bg.png';
import Form from './Form';
import SealImage from '../../../_assets/stamp_seal.png';
import AudioButton from '../../_components/AudioButton';

const ScrollInner = styled(Box)(({ theme }) => ({
  width: 950,
  borderLeft: '15px solid #623a0a',
  borderRight: '15px solid #623a0a',
  padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
  position: 'relative',
  flexDirection: 'column',
  display: 'flex',
  flexGrow: 1,
  backgroundColor: '#f0deb2',
  color: '#000',
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  fontSize: 24,
  zIndex: 2,
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'calc(100% - 28px)',
    height: '100%',
    borderLeft: '14px solid #e1bd8e',
    borderRight: '14px solid #e1bd8e',
    zIndex: -1,
  },
}));
const ScrollOuter = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 2s ease-in-out',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 230,
    backgroundImage: `url(${FlatTopScrollImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 230,
    backgroundImage: `url(${FlatBottomScrollImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
  },
}));

const Container = styled(Box)(({ theme }) => ({
  width: '100%',
  minHeight: '100svh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

const BackgroundImageContainer = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundImage: `url(${BackgroundImage.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  transition: 'opacity 1000ms ease-in-out',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
});

const TopScroll = styled(Box)({
  width: '100%',
  maxWidth: 1400,
  height: 200,
  backgroundImage: `url(${TopScrollImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  flexShrink: 0,
});

const BottomScroll = styled(Box)({
  width: '100%',
  maxWidth: 1400,
  height: 200,
  backgroundImage: `url(${BottomScrollImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  flexShrink: 0,
});

const SuccessTitle = styled('h4')(({ theme }) => ({
  fontSize: 88,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
}));

const SuccessDescription = styled('p')(({ theme }) => ({
  fontSize: 24,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
}));

const SuccessContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Image = styled('img')({
  imageRendering: 'pixelated',
});

const Details = ({ tokenId }: { tokenId: string }) => {
  const [height, setHeight] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioMuted, setAudioMuted] = useState(
    typeof window !== 'undefined' &&
      localStorage.getItem('audioMuted') === 'true',
  );

  useEffect(() => {
    setHeight(1350);
    setBackgroundOpacity(1);
    if (audioRef.current) {
      audioRef.current.volume = audioMuted ? 0 : 0.5;
      audioRef.current.play();
    }
  }, []);

  useEffect(() => {
    if (hasInteracted) {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = audioMuted ? 0 : 0.5;
        audioRef.current.play();
      }
    }
  }, [hasInteracted]);

  const handleInteraction = () => {
    setHasInteracted(true);
  };

  const handleSuccess = () => {
    setHeight(0);
    setTimeout(() => {
      setShowSuccess(true);
      setHeight(300);
    }, 3000);
  };
  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-invitation/_assets/bg_music_2.mp3"
        loop
        preload="auto"
      />
      <Container onClick={handleInteraction}>
        <AudioButton
          audioMuted={audioMuted}
          onChange={(muted) => {
            setAudioMuted(muted);
            if (audioRef.current) {
              audioRef.current.volume = muted ? 0 : 0.5;
            }
          }}
        />
        <BackgroundImageContainer style={{ opacity: backgroundOpacity }} />
        <TopScroll />
        <ScrollOuter style={{ height }}>
          <ScrollInner>
            <>
              {showSuccess ? (
                <SuccessContainer>
                  <Image
                    alt="stamp"
                    src={SealImage.src}
                    width={120}
                    height={120}
                  />
                  <SuccessTitle>Message Delivered</SuccessTitle>
                  <SuccessDescription>
                    Thank you for your response! :)
                  </SuccessDescription>
                </SuccessContainer>
              ) : (
                <Form tokenId={tokenId} onSuccess={() => handleSuccess()} />
              )}
            </>
          </ScrollInner>
        </ScrollOuter>
        <BottomScroll />
      </Container>
    </>
  );
};

export default Details;
