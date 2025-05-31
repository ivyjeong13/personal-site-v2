'use client';

import { Box, styled, useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import TopScrollImage from '../../../_assets/scroll_top.png';
import BottomScrollImage from '../../../_assets/scroll_bottom.png';
import TopScrollMobileImage from '../../../_assets/scroll_top_mobile.png';
import BottomScrollMobileImage from '../../../_assets/scroll_bottom_mobile.png';

import FlatTopScrollImage from '../../../_assets/scroll_top_b.png';
import FlatBottomScrollImage from '../../../_assets/scroll_bottom_b.png';
import BackgroundImage from '../../../_assets/details_bg.png';
import HomeIcon from '../../../_assets/home_icon.png';
import RsvpIcon from '../../../_assets/rsvp_icon.png';
import QuestIcon from '../../../_assets/quest_icon.png';
import SealImage from '../../../_assets/stamp_seal.png';
import MealIcon from '../../../_assets/meal_icon.png';
import AudioButton from '../../_components/AudioButton';
import { jacquard24, pixelify } from '../../../_fonts';
import Form from './Form';
import Tag from './Tag';
import Info from './Info';
import Quests from './quests';
import Menu from './Menu';
import theme from '@/common/theme';
import DrunkDragon from './DrunkDragon';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

const ScrollInner = styled(Box)(({ theme }) => ({
  width: 950,
  borderLeft: '13px solid #623a0a',
  borderRight: '13px solid #623a0a',
  position: 'relative',
  flexDirection: 'column',
  display: 'flex',
  flexGrow: 1,
  backgroundColor: '#f7eac8',
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
    width: 'calc(100% + 26px)',
    height: '100%',
    zIndex: -1,
    backgroundImage: `url(${FlatTopScrollImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    marginLeft: -13,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 'calc(100% + 26px)',
    height: '100%',
    backgroundImage: `url(${FlatBottomScrollImage.src})`,
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
    zIndex: -1,
    marginLeft: -13,
  },
  [theme.breakpoints.down('md')]: {
    width: 365,
    borderLeft: '4px solid #623a0a',
    borderRight: '4px solid #623a0a',
    '&:before': {
      marginLeft: -4,
      width: 'calc(100% + 8px)',
    },
    '&:after': {
      marginLeft: -4,
      width: 'calc(100% + 8px)',
    },
  },
}));
const ScrollOuter = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 0,
  minHeight: 0,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'height 1s ease-in-out, min-height 1s ease-in-out',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    '&:before': {
      height: 64,
    },
    '&:after': {
      height: 64,
    },
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
  [theme.breakpoints.down('md')]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
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

const TopScroll = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 200,
  backgroundImage: `url(${TopScrollImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  flexShrink: 0,
  [theme.breakpoints.down(1320)]: {
    backgroundImage: `url(${TopScrollMobileImage.src})`,
  },
  [theme.breakpoints.down(1024)]: {
    backgroundSize: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    height: 73,
    maxWidth: 375,
    backgroundImage: `url(${TopScrollMobileImage.src})`,
  },
}));

const BottomScroll = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 1400,
  height: 200,
  backgroundImage: `url(${BottomScrollImage.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  flexShrink: 0,
  [theme.breakpoints.down(1320)]: {
    backgroundImage: `url(${TopScrollMobileImage.src})`,
  },
  [theme.breakpoints.down(1024)]: {
    backgroundSize: 'cover',
  },
  [theme.breakpoints.down('md')]: {
    height: 73,
    maxWidth: 375,
    backgroundImage: `url(${BottomScrollMobileImage.src})`,
  },
}));

const SuccessTitle = styled('h4')(({ theme }) => ({
  fontSize: 88,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    fontSize: 44,
    marginTop: theme.spacing(2),
  },
}));

const SuccessDescription = styled('p')(({ theme }) => ({
  fontSize: 24,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
}));

const SuccessDescriptionSmall = styled('p')(({ theme }) => ({
  fontSize: 18,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  maxWidth: 600,
  marginTop: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    fontSize: 14,
  },
}));

const SuccessContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Image = styled('img')({
  imageRendering: 'pixelated',
});

const TagContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: -80,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  zIndex: 5,
  '& p': {
    color: '#000',
  },
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    right: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    height: 'auto',
    top: 'auto',
    justifyContent: 'space-evenly',
    backgroundColor: '#f7eac8',
    borderTop: '4px solid #623a0a',
    '& img': {
      width: 32,
      height: 32,
      gap: theme.spacing(0),
    },
  },
}));

const ViewContent = styled(Box)(({ theme }) => ({
  borderLeft: '13px solid #e1be88',
  borderRight: '13px solid #e1be88',
  padding: `${theme.spacing(4)} ${theme.spacing(6)}`,
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'start',
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    borderLeft: '4px solid #e1be88',
    borderRight: '4px solid #e1be88',
    padding: theme.spacing(2),
  },
}));

const DrunkDragonContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: 1400,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
  pointerEvents: 'none',
  [theme.breakpoints.down(1275)]: {
    display: 'none',
  },
}));

const Details = ({
  guestId,
  disabledFields,
  showWithUs,
}: {
  guestId: number;
  disabledFields?: string[] | null;
  showWithUs?: boolean;
}) => {
  const [height, setHeight] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const infoAudioRef = useRef<HTMLAudioElement>(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [selectedView, setSelectedView] = useState<
    'rsvp' | 'info' | 'quests' | 'menu'
  >('rsvp');
  const [isClient, setIsClient] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const audioMutedRef = useRef(audioMuted);
  const selectedViewRef = useRef(selectedView);
  const [isIOS, setIsIOS] = useState(false);
  const [showDragon, setShowDragon] = useState(false);
  const [dragonDeath, setDragonDeath] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  const ViewHeights = {
    rsvp: 1900,
    menu: isMobile ? 1984 : 2350,
    info: isMobile ? 325 : 600,
    quests: 550,
  };

  // Update refs when state changes
  useEffect(() => {
    audioMutedRef.current = audioMuted;
  }, [audioMuted]);

  useEffect(() => {
    selectedViewRef.current = selectedView;
  }, [selectedView]);

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
    // Set initial states from localStorage
    const storedAudioMuted = localStorage.getItem('audioMuted') === 'true';
    const storedRsvp = localStorage.getItem('rsvp') === 'true';
    const initialView = storedRsvp ? 'info' : 'rsvp';

    setAudioMuted(storedAudioMuted);
    setSelectedView(initialView);
    audioMutedRef.current = storedAudioMuted;
    selectedViewRef.current = initialView;

    // Set initial height to 0 and background opacity
    setHeight(0);
    setBackgroundOpacity(1);

    // Use timeout to expand to target height after initial render
    setTimeout(() => {
      setHeight(ViewHeights[initialView]);
    }, 100);

    // Add click event listener to initialize audio
    const handleClick = async () => {
      if (!audioContext) {
        const context = new (window.AudioContext ||
          window.webkitAudioContext)();
        setAudioContext(context);
      }
      // Only proceed with audio if not muted
      if (!audioMutedRef.current) {
        // Resume audio context if it's suspended
        if (audioContext?.state === 'suspended') {
          await audioContext.resume();
        }

        if (selectedViewRef.current === 'info') {
          if (infoAudioRef.current && infoAudioRef.current.paused) {
            infoAudioRef.current.volume = 0.5;
            infoAudioRef.current.play();
          }
        } else {
          if (audioRef.current && audioRef.current.paused) {
            audioRef.current.volume = 0.5;
            audioRef.current.play();
          }
        }
      }
      document.removeEventListener('click', handleClick);
    };
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const audioElement = audioRef.current;
    if (!audioElement) return;

    const playAudio = async () => {
      // Initialize audio context if not already done
      if (!audioContext) {
        const context = new (window.AudioContext ||
          window.webkitAudioContext)();
        setAudioContext(context);
      }

      // Resume audio context if it's suspended
      if (audioContext?.state === 'suspended') {
        await audioContext.resume();
      }

      if (selectedView !== 'info') {
        audioElement.volume = audioMuted ? 0 : 0.5;
        audioElement.play();
      }
    };

    playAudio();

    if (selectedView !== 'info' && !showDragon) {
      setTimeout(() => {
        setShowDragon(true);
      }, 1500);
    } else if (selectedView === 'info' && showDragon) {
      setShowDragon(false);
    }
  }, [selectedView, audioMuted, isClient, audioContext]);

  useEffect(() => {
    // Check if device is iOS
    const checkIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };
    setIsIOS(checkIOS());
  }, []);

  // Don't render anything until client-side initialization is complete
  if (!isClient) {
    return null;
  }

  const handleSuccess = (response: 'yes' | 'no', isNew: boolean) => {
    setHeight(0);
    setTimeout(
      () => {
        if (response === 'yes') {
          if (isNew) {
            setIsNew(true);
          }
          handleView('info');
        } else {
          setShowSuccess(true);
          setHeight(450);
        }
      },
      response === 'yes' ? 0 : 1500,
    );
  };

  const handleView = (view: 'rsvp' | 'info' | 'quests' | 'menu') => {
    if (selectedView === view) {
      return;
    }
    setHeight(0);
    if (view === 'info') {
      setDragonDeath(true);
    } else {
      setDragonDeath(false);
    }
    const height = ViewHeights[view];
    setTimeout(() => {
      setShowSuccess(false);
      setSelectedView(view);
      setHeight(height);
    }, 1500);
  };

  const handleChangeMusic = async (val: 'intro' | 'info') => {
    // Initialize audio context if not already done
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
    }

    // Resume audio context if it's suspended
    if (audioContext?.state === 'suspended') {
      await audioContext.resume();
    }
    if (isIOS) {
      // not allowing changing of music on iOS
      // if audioRef isn't playing, play it
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.play();
      }
      return;
    }

    const audioToPause = val === 'intro' ? infoAudioRef : audioRef;
    const audioToPlay = val === 'intro' ? audioRef : infoAudioRef;

    const fadeOutInterval = setInterval(() => {
      if (!audioToPause.current) {
        clearInterval(fadeOutInterval);
        return;
      }
      if (audioToPause.current.volume > 0.05) {
        audioToPause.current.volume -= 0.05;
      } else {
        audioToPause.current.volume = 0;
        audioToPause.current.pause();
        clearInterval(fadeOutInterval);
      }
    }, 100);

    setTimeout(() => {
      if (audioToPlay.current) {
        audioToPlay.current.volume = 0;
        audioToPlay.current.currentTime = 0;
        audioToPlay.current.play();
      }
      const fadeInInterval = setInterval(() => {
        if (!audioToPlay.current || audioMuted) {
          clearInterval(fadeInInterval);
          return;
        }
        if (audioToPlay.current.volume < 0.5) {
          audioToPlay.current.volume += 0.05;
        } else {
          audioToPlay.current.volume = 0.5;
          clearInterval(fadeInInterval);
        }
      }, 100);
    }, 1000);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://res.cloudinary.com/dwnebujkh/video/upload/v1748276715/xDeviruchi_-_Title_Theme_zmulsf.wav"
        preload="auto"
        loop
        playsInline
      />
      <audio
        ref={infoAudioRef}
        src="https://res.cloudinary.com/dwnebujkh/video/upload/v1748291028/8-BIT_OST_-_Goodby_t_e_h7fygh.wav"
        preload="auto"
        loop
        playsInline
      />
      <Container>
        {!isIOS && (
          <AudioButton
            audioMuted={audioMuted}
            onChange={async (muted) => {
              setAudioMuted(muted);

              // Ensure audio context is initialized
              if (!audioContext) {
                const context = new (window.AudioContext ||
                  window.webkitAudioContext)();
                setAudioContext(context);
              }

              // Resume audio context if suspended
              if (audioContext?.state === 'suspended') {
                await audioContext.resume();
              }

              // Handle the currently playing audio
              if (muted) {
                // Set volume to 0 and pause the audio
                if (selectedView === 'info' && infoAudioRef.current) {
                  infoAudioRef.current.volume = 0;
                  infoAudioRef.current.pause();
                } else if (audioRef.current) {
                  audioRef.current.volume = 0;
                  audioRef.current.pause();
                }
              } else {
                // Resume playing and set volume
                if (selectedView === 'info' && infoAudioRef.current) {
                  infoAudioRef.current.volume = 0.5;
                  if (infoAudioRef.current.paused) {
                    const playPromise = infoAudioRef.current.play();
                    if (playPromise !== undefined) {
                      playPromise.catch((error) => {
                        console.error('Failed to play info audio:', error);
                      });
                    }
                  }
                } else if (audioRef.current) {
                  audioRef.current.volume = 0.5;
                  if (audioRef.current.paused) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                      playPromise.catch((error) => {
                        console.error('Failed to play audio:', error);
                      });
                    }
                  }
                }
              }
            }}
          />
        )}
        <BackgroundImageContainer style={{ opacity: backgroundOpacity }} />
        {isMobile && selectedView !== 'info' && (
          <TagContainer>
            <Tag
              name="Wedding Details"
              onClick={() => handleView('info')}
              simple={isMobile}
            >
              <img src={HomeIcon.src} alt="info" />
            </Tag>
            <Tag
              name="Your RSVP"
              onClick={() => handleView('rsvp')}
              selected={selectedView === 'rsvp'}
              simple={isMobile}
            >
              <img src={RsvpIcon.src} alt="rsvp" />
            </Tag>
            <Tag
              name="Sample Menu"
              onClick={() => handleView('menu')}
              selected={selectedView === 'menu'}
              simple={isMobile}
            >
              <img src={MealIcon.src} alt="sample menu" />
            </Tag>
            <Tag
              name="Journal Log"
              onClick={() => handleView('quests')}
              selected={selectedView === 'quests'}
              simple={isMobile}
            >
              <img src={QuestIcon.src} alt="quest" />
            </Tag>
          </TagContainer>
        )}

        <DrunkDragonContainer sx={{ opacity: showDragon ? 1 : 0 }}>
          <Box
            sx={{
              width: 400,
              height: 320,
              transform: 'translateX(100px)',
            }}
          >
            <DrunkDragon death={dragonDeath} />
          </Box>
        </DrunkDragonContainer>

        <TopScroll />
        <ScrollOuter
          style={{
            height,
            maxHeight: selectedView !== 'info' ? 'fit-content' : undefined,
          }}
          id="scroll-outer"
        >
          <ScrollInner>
            {!isMobile && (
              <TagContainer>
                <Tag
                  name="Wedding Details"
                  onClick={() => handleView('info')}
                  selected={selectedView === 'info'}
                  simple={isMobile}
                >
                  <img src={HomeIcon.src} alt="info" />
                </Tag>
                <Tag
                  name="Your RSVP"
                  onClick={() => handleView('rsvp')}
                  selected={selectedView === 'rsvp'}
                  simple={isMobile}
                >
                  <img src={RsvpIcon.src} alt="rsvp" />
                </Tag>
                <Tag
                  name="Sample Menu"
                  onClick={() => handleView('menu')}
                  selected={selectedView === 'menu'}
                  simple={isMobile}
                >
                  <img src={MealIcon.src} alt="sample menu" />
                </Tag>
                <Tag
                  name="Journal Log"
                  onClick={() => handleView('quests')}
                  selected={selectedView === 'quests'}
                  simple={isMobile}
                >
                  <img src={QuestIcon.src} alt="quest" />
                </Tag>
              </TagContainer>
            )}
            <ViewContent>
              {selectedView === 'rsvp' && (
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
                      <SuccessDescriptionSmall>
                        If you need to make any changes, you can visit the RSVP
                        again and update your information.
                      </SuccessDescriptionSmall>
                    </SuccessContainer>
                  ) : (
                    <Form
                      guestId={guestId}
                      onSuccess={handleSuccess}
                      disabledFields={disabledFields}
                      showWithUs={showWithUs}
                    />
                  )}
                </>
              )}
              {selectedView === 'info' && (
                <Info
                  onChangeMusic={handleChangeMusic}
                  onChangeView={handleView}
                  isNew={isNew}
                  guestId={guestId}
                />
              )}
              {selectedView === 'quests' && <Quests />}
              {selectedView === 'menu' && <Menu />}
            </ViewContent>
          </ScrollInner>
        </ScrollOuter>
        <BottomScroll />
      </Container>
    </>
  );
};

export default Details;
