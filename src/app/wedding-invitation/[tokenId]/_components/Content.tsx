'use client';

import { centeredFlexStyles } from '@/common/styles';
import { Box, styled, useMediaQuery } from '@mui/material';
import { Canvas, useFrame, useLoader, Vector3 } from '@react-three/fiber';
import { Plane, SpriteAnimator } from '@react-three/drei';
import { RepeatWrapping, TextureLoader } from 'three';
import { Suspense, useEffect, useState, useRef } from 'react';
import Messenger from './messenger';
import theme from '@/common/theme';
import { createClient } from '@/utils/supabase/client';
import { WeddingGuest } from '../../_types';
import { pixelify } from '../../_fonts';
import LetterIcon from '../../_assets/letter_icon.png';
import LetterOpenIcon from '../../_assets/letter_open_icon.png';
import LetterOpenIconSelected from '../../_assets/letter_open_selected.png';
import { useRouter } from 'next/navigation';
import AudioButton from './AudioButton';

const canvasWidth = 1456;
const canvasHeight = 816;
const Container = styled(Box)({
  ...centeredFlexStyles,
  width: '100%',
  flexDirection: 'column',
  transition: 'opacity 1000ms ease-in-out',
});

type LayerProps = {
  duration: number;
  image: string;
  repeatX: number;
  speed: number;
};

function Character({ onShow }: { onShow: () => void }) {
  const { innerWidth } = window;
  const finalPosition =
    innerWidth > canvasWidth
      ? -(canvasWidth / 2) + canvasWidth / 3
      : -(innerWidth / 2) + innerWidth / 3;
  const movementInterval = 15;
  const [shouldMove, setShouldMove] = useState(false);
  const [position, setPosition] = useState<number[] & Vector3>([
    -(innerWidth / 2) - 50,
    -190,
    1,
  ]);
  const [frameStatus, setFrameStatus] = useState('run');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldMove(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldMove) {
      return;
    }

    let value = position[0];
    const interval = setInterval(() => {
      if (value < finalPosition) {
        value = value + movementInterval;
        setPosition([value, -190, 1]);
      } else {
        clearInterval(interval);
        setFrameStatus('idle');
        setShouldMove(false);
        onShow();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [shouldMove]);

  return (
    <SpriteAnimator
      position={position}
      fps={3}
      frameName={frameStatus}
      startFrame={0}
      autoPlay={true}
      loop={true}
      scale={150}
      textureImageURL="https://res.cloudinary.com/dyvbqbejn/image/upload/v1731698172/wedding/assets/qpqq2uubnawubq10whgj.png"
      textureDataURL="https://res.cloudinary.com/dyvbqbejn/raw/upload/v1731776946/wedding/assets/ikpjl6aoejeokxtszgnv.json"
      animationNames={['idle', 'run']}
      alphaTest={0.001}
      asSprite={false}
    />
  );
}

function Floor({ duration, speed }: { duration: number; speed: number }) {
  const texture = useLoader(
    TextureLoader,
    'https://res.cloudinary.com/dyvbqbejn/image/upload/v1731712888/wedding/assets/sr9dkxcpdyxxesgt0l1p.png',
  );

  texture.wrapS = RepeatWrapping;
  texture.repeat.set(5, 1);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (time <= duration) {
      texture.offset.x = time * speed;
    }
  });

  return (
    <Plane args={[1456, 96 * 2]} position={[0, -310, 1]}>
      <meshBasicMaterial map={texture} transparent />
    </Plane>
  );
}

function Layer({ duration, image, repeatX, speed }: LayerProps) {
  const texture = useLoader(TextureLoader, image);
  texture.wrapS = RepeatWrapping;
  texture.repeat.set(repeatX, 1);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (time <= duration) {
      texture.offset.x = time * speed;
    }
  });

  return (
    <Plane args={[1456, 816]}>
      <meshBasicMaterial map={texture} transparent />
    </Plane>
  );
}

const Scene = ({ onShow }: { onShow: () => void }) => {
  const image1 =
    'https://res.cloudinary.com/dyvbqbejn/image/upload/v1731707759/wedding/assets/tmsrqswflnczwbrmhkni.png';
  const image2 =
    'https://res.cloudinary.com/dyvbqbejn/image/upload/v1731707759/wedding/assets/ag2kpftjdfbinwyhk9fu.png';
  return (
    <Suspense fallback={null}>
      <Layer duration={5} image={image1} speed={0.05} repeatX={3} />
      <Layer duration={5} image={image2} speed={0.1} repeatX={1} />
      <Floor duration={5} speed={0.2} />
      <Character onShow={onShow} />
    </Suspense>
  );
};

const CenterContainer = styled(Box)({
  ...centeredFlexStyles,
  width: '100%',
  height: '100%',
  color: 'white',
  fontSize: '24px',
  fontFamily: pixelify.style.fontFamily,
});

const LoadingContainer = styled(Box)({
  ...centeredFlexStyles,
  width: '100%',
  height: '100%',
  color: 'white',
  fontSize: '24px',
  fontFamily: pixelify.style.fontFamily,
  '& img': {
    imageRendering: 'pixelated',
    width: 35,
    height: 30,
    animation: 'bounce 1s ease-in-out infinite',
  },
  '& > div': {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
});

const PlayButton = styled('button')({
  color: 'white',
  fontSize: '24px',
  fontFamily: pixelify.style.fontFamily,
  position: 'relative',
  paddingLeft: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 40,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  transition: 'opacity 300ms ease-in-out',

  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: 35,
    height: 40,
    backgroundImage: `url(${LetterOpenIcon.src})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    imageRendering: 'pixelated',
  },

  '&:hover': {
    animation: 'bounce 1s ease-in-out infinite',
    color: '#fdd179',
    '&:before': {
      backgroundImage: `url(${LetterOpenIconSelected.src})`,
    },
  },
});

const CanvasContainer = styled(Box)({
  opacity: 0,
  transition: 'opacity 1000ms ease-in-out',
  width: '100%',
  height: '100%',
  position: 'relative',
});

const Contents = ({ tokenId }: { tokenId: string }) => {
  const client = createClient();
  const [showMessenger, setShowMessenger] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [guest, setGuest] = useState<WeddingGuest>();
  const audioRef = useRef<HTMLAudioElement>(null);

  const router = useRouter();

  const [pending, setPending] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [containerOpacity, setContainerOpacity] = useState(1);
  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const [audioMuted, setAudioMuted] = useState(
    typeof window !== 'undefined' &&
      localStorage.getItem('audioMuted') === 'true',
  );
  const handlePlayClick = () => {
    setButtonOpacity(0);
    setTimeout(() => {
      setPlaying(true);
      if (audioRef.current) {
        audioRef.current.volume = audioMuted ? 0 : 0.5;
        audioRef.current.play();
      }
      setTimeout(() => {
        setCanvasOpacity(1);
      }, 50);
    }, 300);
  };

  const init = async () => {
    const { data: tokens } = await client
      .from('token')
      .select('*')
      .eq('token', tokenId);

    if (!tokens?.[0]) {
      setUnauthorized(true);
      setPending(false);
      return;
    }

    const { data: guests } = await client
      .from('wedding_guest')
      .select('*')
      .eq('id', tokens[0].guest_id);

    const guest = guests?.[0];
    setGuest(guest);
    setPending(false);
  };

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    init();

    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const handleViewInvitation = () => {
    setContainerOpacity(0);

    // Fade out audio
    if (audioRef.current) {
      const audio = audioRef.current;
      const fadeOutInterval = setInterval(() => {
        if (audio.volume > 0.05) {
          audio.volume -= 0.05;
        } else {
          audio.volume = 0;
          clearInterval(fadeOutInterval);
        }
      }, 100);
    }

    setTimeout(() => {
      router.push(`/wedding-invitation/${tokenId}/details`);
    }, 1000);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/wedding-invitation/_assets/bg_music.mp3"
        loop
        preload="auto"
      />
      <AudioButton
        audioMuted={audioMuted}
        onChange={(muted) => {
          setAudioMuted(muted);
          if (audioRef.current) {
            audioRef.current.volume = muted ? 0 : 0.5;
          }
        }}
      />
      <Container style={{ opacity: containerOpacity }}>
        <Box
          sx={{
            width: canvasWidth,
            height: isMobile ? `${viewportHeight}px` : canvasHeight,
          }}
        >
          {pending ? (
            <LoadingContainer>
              <div>
                <img src={LetterIcon.src} alt="Letter" /> Loading...
              </div>
            </LoadingContainer>
          ) : unauthorized ? (
            <CenterContainer>
              <div>Unauthorized</div>
            </CenterContainer>
          ) : !playing ? (
            <CenterContainer>
              <PlayButton
                onClick={handlePlayClick}
                style={{ opacity: buttonOpacity }}
              >
                Open Invitation
              </PlayButton>
            </CenterContainer>
          ) : (
            <CanvasContainer style={{ opacity: canvasOpacity }}>
              <Canvas orthographic>
                <Scene onShow={() => setShowMessenger(true)} />
              </Canvas>
            </CanvasContainer>
          )}
        </Box>
        {!pending && !unauthorized && showMessenger && (
          <Messenger
            guest={guest}
            audioMuted={audioMuted}
            onViewInvitation={handleViewInvitation}
          />
        )}
      </Container>
    </>
  );
};

export default Contents;
