import { Box, styled, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { jacquard24, pixelify } from '../../_fonts';
import theme from '@/common/theme';
import { useState, useEffect, useRef } from 'react';
import { WeddingGuest } from '../../_types';
import { useTypingEffect } from '../../_hooks/useTypingEffect';

const CharacterPortrait = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: -200,
  left: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    top: -100,
  },
}));

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'transparent',
  position: 'absolute',
  maxWidth: 1456,
  width: '100%',
  padding: theme.spacing(2),
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
});

const SpeechBubble = styled(Box)(({ theme }) => ({
  color: theme.palette.tertiary.main,
  backgroundColor: '#ffefd7',
  border: '4px solid #696969',
  borderRadius: theme.spacing(0.5),
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(2),
  paddingRight: theme.spacing(2),
  position: 'relative',
  zIndex: 1,
  height: 200,
  '& p': {
    fontFamily: pixelify.style.fontFamily,
    fontWeight: 400,
    fontSize: 24,
  },
  '& p+p': {
    marginTop: theme.spacing(1),
  },
  [theme.breakpoints.down('md')]: {
    height: 175,
    padding: theme.spacing(1),
    paddingRight: theme.spacing(1),
    '& p': {
      fontSize: 16,
    },
  },
}));

const CharacterName = styled('h1')(({ theme }) => ({
  backgroundColor: '#ffefd7',
  border: '4px solid #696969',
  borderRadius: theme.spacing(0.5),
  color: theme.palette.tertiary.main,
  padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
  marginLeft: 350,
  marginBottom: theme.spacing(1),
  fontSize: 49,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  width: 'auto',
  marginTop: 46,
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
    marginTop: 120,
    fontSize: 28,
    width: '100%',
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    zIndex: 1,
  },
}));

const NextButton = styled('div')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.palette.tertiary.main,
  fontSize: 16,
  fontFamily: pixelify.style.fontFamily,
  marginTop: 'auto',
  alignSelf: 'end',
  padding: theme.spacing(1),
}));

const Messenger = ({
  guest,
  audioMuted,
  onViewInvitation,
}: {
  guest?: WeddingGuest;
  audioMuted: boolean;
  onViewInvitation: () => void;
}) => {
  const greeting = `Our Esteemed Guest${guest?.guests && guest.guests > 1 ? 's' : ''}, ${guest?.name ?? 'Lord / Lady'}`;
  const messageA =
    'By the grace of good fortune and the bonds of true love, it is with a heart full of joy that I do humbly bid thee attend a most wondrous occasion, a day of holy matrimony!';
  const messageB =
    'The time to drinketh, danceth, and maketh merry is at hand! Gather ye all and prepare to partake in joyous celebration of the union betwixt David Woods and Ivy Jeong!';

  const [showNext, setShowNext] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    displayedText: displayedGreeting,
    isComplete: isGreetingComplete,
    skip: skipGreeting,
    isPlaying: isGreetingPlaying,
  } = useTypingEffect(greeting, 50);
  const {
    displayedText: displayedMessage,
    skip: skipMessageA,
    isComplete: isMessageAComplete,
    isPlaying: isMessageAPlaying,
  } = useTypingEffect(messageA, 20, isGreetingComplete);
  const {
    displayedText: displayedMessageB,
    skip: skipMessageB,
    isComplete: isMessageBComplete,
    isPlaying: isMessageBPlaying,
  } = useTypingEffect(messageB, 20, isMessageAComplete && showNext);

  const handleSkip = () => {
    if (!isGreetingComplete) {
      skipGreeting();
    } else if (!isMessageAComplete) {
      skipMessageA();
    } else if (!showNext) {
      setShowNext(true);
    } else if (!isMessageBComplete) {
      skipMessageB();
    } else {
      onViewInvitation();
    }
  };

  useEffect(() => {
    const handleKeyPress = () => {
      handleSkip();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isGreetingComplete, showNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioMuted ? 0 : 0.5;
    }
  }, [audioMuted]);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isGreetingPlaying || isMessageAPlaying || isMessageBPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    }
  }, [isGreetingPlaying, isMessageAPlaying, isMessageBPlaying]);

  return (
    <Container onClick={handleSkip}>
      <audio
        ref={audioRef}
        src="/wedding-invitation/_assets/happi_npc_voice.wav"
        loop
        preload="auto"
      />
      <CharacterPortrait>
        <Image
          src="https://res.cloudinary.com/dyvbqbejn/image/upload/v1731778921/wedding/assets/cubynylzttjvfwbycayf.png"
          alt="Image of messenger for wedding invite."
          width={isMobile ? 250 : 350}
          height={isMobile ? 250 : 350}
        />
      </CharacterPortrait>
      <CharacterName>A Joyous Messenger</CharacterName>
      <SpeechBubble>
        {showNext ? (
          <>
            <p>{displayedMessageB}</p>
            <NextButton>Click any key to continue...</NextButton>
          </>
        ) : (
          <>
            <p style={{ fontWeight: 600 }}>{displayedGreeting}</p>
            <p>{displayedMessage}</p>
            <NextButton>Click any key to continue...</NextButton>
          </>
        )}
      </SpeechBubble>
    </Container>
  );
};

export default Messenger;
