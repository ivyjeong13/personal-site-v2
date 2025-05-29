import { jacquard24, pixelify } from '@/app/wedding-invitation/_fonts';
import { Canvas, useLoader, Vector3, useFrame } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { TextureLoader, Texture, MeshBasicMaterial } from 'three';
import { Box, styled, useMediaQuery } from '@mui/material';
import ChurchBg from '../../../_assets/church_bg.png';
import { Suspense, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import ExitButton from './ExitButton';
import theme from '@/common/theme';
import LocationButton from './LocationButton';

import HatA from '../../../_assets/fc2003.png';
import CoatA from '../../../_assets/fc2084.png';
import ShoesA from '../../../_assets/fc1990.png';

import HatB from '../../../_assets/fc2053.png';
import CoatB from '../../../_assets/fc2051.png';
import ShoesB from '../../../_assets/fc2057.png';

import HatC from '../../../_assets/fc1955.png';
import CoatC from '../../../_assets/fc1975.png';
import ShoesC from '../../../_assets/fc2038.png';

import Bards from '../../../_assets/bards.png';
import Tag from './Tag';

import RsvpIcon from '../../../_assets/rsvp_icon.png';
import QuestIcon from '../../../_assets/quest_icon.png';
import MealIcon from '../../../_assets/meal_icon.png';

import SealImage from '../../../_assets/stamp_seal.png';

import { createClient } from '@/utils/supabase/client';
import {
  LayerProps,
  SpriteData,
  WeddingGuestSprite,
} from '@/app/wedding-invitation/_types';
import Image from 'next/image';
import { spritesMap } from '@/app/wedding-invitation/_constants';
import SelectAvatar from './SelectAvatar';

const image1 =
  'https://res.cloudinary.com/dwnebujkh/image/upload/v1748301418/interior_castle_dwqoe4.png';

const ChurchBackground = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  imageRendering: 'pixelated',
});

const BecomeFullscreen = styled('div')(({ theme }) => ({
  position: 'relative',
  isolation: 'isolate',
  minWidth: 1,
  minHeight: 1,
  width: '100%',
  zIndex: 999,
  borderRadius: theme.spacing(4),
  transform: 'scale(1)',
  transformOrigin: '50% 95%',
  transition: 'transform 1s ease, background-color 1s ease',
  overflow: 'visible',
  '&:before': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    content: '""',
    backgroundColor: 'transparent',
    zIndex: 9,
    transition: 'background-color 300ms ease',
  },
  '&.transition': {
    transition: 'all 1s ease',
    zIndex: 9,
    borderRadius: 0,
  },
  '&.zoom': {
    transform: 'scale(20)',
    overflow: 'visible',
  },
  '&.hide-outside': {
    '&:before': {
      transition: 'background-color 1s ease',
      backgroundColor: '#000',
    },
  },
}));

const InsideContent = styled('div')({
  position: 'fixed',
  isolation: 'isolate',
  zIndex: -1,
  height: 0,
  width: 0,
  overflow: 'hidden',
  backgroundColor: '#131a22',
  color: '#b9a689',
  top: 0,
  left: 0,
  opacity: 0,
  transition: 'opacity 500ms ease',
  WebkitOverflowScrolling: 'touch',
  '&.show-inside': {
    opacity: 1,
    overflow: 'auto',
    width: '100%',
    height: '100%',
    zIndex: 20,
    position: 'fixed',
    '@supports (-webkit-touch-callout: none)': {
      height: '-webkit-fill-available',
    },
  },
  '& canvas': {
    imageRendering: 'pixelated',
  },
});

const EnterChurchButton = styled('button')({
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  width: '100%',
  position: 'relative',
});

const BlurBackground = styled('div')(({ theme }) => ({
  width: '100%',
  height: 700,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    content: '""',
    backgroundImage: `url(${image1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    filter: 'blur(3px)',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: '100%',
  },
  [theme.breakpoints.down('md')]: {
    height: 'calc(100svh - 100px)',
  },
}));

function Layer({ image, width, height }: LayerProps) {
  const texture = useLoader(TextureLoader, image);
  return (
    <Plane args={[width, height]}>
      <meshBasicMaterial map={texture} transparent />
    </Plane>
  );
}

const Scene = ({
  width,
  viewportWidth,
  height,
  characters,
  isMobile,
}: {
  width: number;
  viewportWidth: number;
  height: number;
  characters: WeddingGuestSprite[];
  isMobile: boolean;
}) => {
  return (
    <Suspense fallback={null}>
      <Layer image={image1} width={width} height={height} />
      {characters.map((character) => (
        <Character
          key={character.sprite_animation}
          canvasWidth={isMobile ? viewportWidth : width}
          canvasHeight={height}
          animationFrame={character.sprite_animation}
          textureImageURL={character.sprite_image_url}
          textureDataURL={character.sprite_data_name}
          isMobile={isMobile}
          name={character.wedding_guest?.name ?? ''}
        />
      ))}
    </Suspense>
  );
};

const Location = styled('h3')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    fontSize: 34,
  },
}));

const Attire = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  imageRendering: 'pixelated',
});

const Subtitle = styled('h2')(({ theme }) => ({
  fontSize: 28,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  color: '#d3d8e0',
  [theme.breakpoints.down('md')]: {
    fontSize: 18,
  },
}));

const InfoSnippet = styled('div')(({ theme }) => ({
  maxWidth: 900,
  margin: `${theme.spacing(8)} auto`,
  '& p': {
    fontSize: 22,
    fontFamily: pixelify.style.fontFamily,
    fontWeight: 400,
    lineHeight: '32px',
    color: '#d3d8e0',
  },
  '& a': {
    color: '#1591EA',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
    margin: `${theme.spacing(4)} auto`,
    '& p': {
      fontSize: 14,
      lineHeight: '28px',
    },
  },
}));

const InfoHeader = styled('h2')(({ theme }) => ({
  fontSize: 80,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  position: 'relative',

  '& > span': {
    backgroundColor: '#131a22',
    position: 'relative',
    zIndex: 1,
    paddingRight: theme.spacing(3),
  },

  '&:before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    transformY: '-50%',
    width: '100%',
    height: 3,
    left: 0,
    backgroundColor: '#b9a689',
    zIndex: 0,
  },
  '& + h3': {
    marginTop: theme.spacing(4),
  },
  '& + p': {
    marginTop: theme.spacing(1),
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 48,
    '& > span': {
      paddingRight: theme.spacing(1),
    },
    '&:before': {
      height: 1,
    },
  },
}));

const NavBar = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: -36,
  right: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  paddingRight: theme.spacing(4),
  zIndex: 1,
  '& p': {
    color: '#000',
  },
  [theme.breakpoints.down('md')]: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    justifyContent: 'space-evenly',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    zIndex: 9999,
    color: '#d3d8e0',
    backgroundColor: '#131a22',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: -24,
      left: 0,
      height: 24,
      width: '100%',
      background: 'linear-gradient(to bottom, transparent, #10141a)',
    },
    '& p': {
      color: '#d3d8e0',
    },
  },
}));

const MobileHeaderBlock = styled('div')({
  position: 'fixed',
  background: '#131a22',
  width: '100%',
  height: 64,
  zIndex: 10,
  top: 0,
  left: 0,
  '&:before': {
    content: '""',
    position: 'absolute',
    bottom: -24,
    left: 0,
    height: 24,
    width: '100%',
    background: 'linear-gradient(to top, transparent, #10141a)',
  },
});

const InfoTitleContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: theme.spacing(4),
  '& h1': {
    fontSize: 175,
    fontFamily: jacquard24.style.fontFamily,
    fontWeight: 400,
    textAlign: 'center',
  },
  '& span': {
    fontSize: 92,
    fontFamily: jacquard24.style.fontFamily,
    fontWeight: 400,
    textAlign: 'center',
  },
  [theme.breakpoints.down('md')]: {
    '& h1': {
      fontSize: 72,
      lineHeight: '58px',
      marginTop: theme.spacing(1),
    },
    '& span': {
      fontSize: 32,
    },
  },
}));

const InfoClosing = styled('div')(({ theme }) => ({
  margin: `${theme.spacing(4)} 0`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
  '& h4': {
    position: 'relative',
    fontSize: 58,
    textAlign: 'center',
    fontWeight: 400,
    fontFamily: jacquard24.style.fontFamily,
    width: '100%',
    maxWidth: 1400,
    '& > span': {
      backgroundColor: '#131a22',
      padding: `0 ${theme.spacing(2)}`,
      zIndex: 1,
      position: 'relative',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transformY: '-50%',
      left: 0,
      height: 4,
      width: '100%',
      backgroundColor: '#b9a689',
    },
  },
  '& p': {
    maxWidth: 600,
    color: '#d3d8e0',
    fontSize: 20,
    padding: `${theme.spacing(4)} 0`,
    lineHeight: '32px',
  },
  [theme.breakpoints.down('md')]: {
    padding: `0 ${theme.spacing(2)}`,
    '& p': {
      fontSize: 14,
      lineHeight: '22px',
    },
    '& h4': {
      fontSize: 36,
      '&:before': {
        height: 1,
      },
    },
  },
}));

const SelectAvatarTextContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  imageRendering: 'pixelated',
  '& h1': {
    fontSize: 48,
    fontFamily: jacquard24.style.fontFamily,
    fontWeight: 400,
    textAlign: 'center',
  },
  '& p': {
    marginTop: theme.spacing(2),
  },

  [theme.breakpoints.down('md')]: {
    '& h1': {
      fontSize: 36,
    },
  },
}));

function Character({
  canvasWidth,
  canvasHeight,
  animationFrame,
  textureImageURL,
  textureDataURL,
  isMobile,
  // name,
}: {
  canvasWidth: number;
  canvasHeight: number;
  animationFrame: string;
  textureImageURL: string;
  textureDataURL: string;
  isMobile: boolean;
  name: string;
}) {
  // Calculate Y position in bottom half of canvas
  const minY = -(canvasHeight / 2); // Bottom of canvas
  const maxY = 0; // Middle of canvas
  const randomY = minY + Math.random() * (maxY - minY);

  // Calculate random X position within canvas width
  // Adjust padding based on mobile viewport
  const padding = isMobile ? 100 : 50;
  const minX = -(canvasWidth / 2) + padding;
  const maxX = canvasWidth / 2 - padding;
  const randomX = minX + Math.random() * (maxX - minX);

  // Calculate z position based on y position
  // Characters with more negative Y (farther from 0) should have higher z value
  const zPosition = 1 + (maxY - randomY) / (maxY - minY);

  const [position] = useState<number[] & Vector3>([
    randomX,
    randomY,
    zPosition,
  ]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteData, setSpriteData] = useState<SpriteData | null>(null);
  const [texture, setTexture] = useState<Texture | null>(null);
  const frameTime = 1 / 3; // 3 FPS
  const timeRef = useRef(0);

  // Load sprite sheet and data
  useEffect(() => {
    const loadResources = async () => {
      try {
        const textureLoader = new TextureLoader();
        const loadedTexture = await textureLoader.loadAsync(textureImageURL);
        loadedTexture.minFilter = loadedTexture.magFilter = THREE.NearestFilter;

        const jsonData = spritesMap.get(textureDataURL) as SpriteData;

        setTexture(loadedTexture);
        setSpriteData(jsonData);
      } catch (error) {
        console.error('Error loading sprite resources:', error);
      }
    };

    loadResources();
  }, [textureImageURL, textureDataURL]);

  // Animation loop
  useFrame((state, delta) => {
    if (!spriteData || !texture) return;

    timeRef.current += delta;
    if (timeRef.current >= frameTime) {
      timeRef.current = 0;

      const frames = Object.keys(spriteData.frames)
        .filter((key) => key.toLowerCase().startsWith(`${animationFrame}_`))
        .sort();

      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }
  });

  if (!texture || !spriteData) return null;

  const frames = Object.keys(spriteData.frames)
    .filter((key) => key.toLowerCase().startsWith(`${animationFrame}_`))
    .sort();

  const currentFrameData = spriteData.frames[frames[currentFrame]];
  if (!currentFrameData) return null;

  const { frame } = currentFrameData;

  // Calculate UV coordinates for the current frame
  const textureWidth = spriteData.meta.size.w;
  const textureHeight = spriteData.meta.size.h;

  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.001,
  });

  // Update texture coordinates for the current frame
  material.map!.offset.set(
    frame.x / textureWidth,
    1 - (frame.y + frame.h) / textureHeight,
  );
  material.map!.repeat.set(frame.w / textureWidth, frame.h / textureHeight);

  const scaleMultiplier = isMobile ? 3.5 : 5;
  // const characterHeight = frame.h * scaleMultiplier;

  return (
    <group position={position}>
      <Plane
        position={[0, 0, 0]}
        scale={[frame.w * scaleMultiplier, frame.h * scaleMultiplier, 1]}
      >
        <meshBasicMaterial
          attach="material"
          map={material.map}
          transparent
          alphaTest={0.001}
          side={THREE.DoubleSide}
        />
      </Plane>
      {/* <Text
        position={[0, characterHeight / 2 + 10, 0]}
        fontSize={isMobile ? 10 : 16}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={2}
        outlineColor="#000000"
      >
        {name}
      </Text> */}
    </group>
  );
}

const Info = ({
  onChangeMusic,
  onChangeView,
  isNew,
  guestId,
}: {
  onChangeMusic: (val: 'intro' | 'info') => void;
  onChangeView: (val: 'rsvp' | 'menu' | 'quests') => void;
  isNew: boolean;
  guestId: number;
}) => {
  const client = createClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerDimensions, setContainerDimensions] = useState<{
    x: number | 'auto';
    y: number | 'auto';
    width: number;
    height: number;
  }>();
  const [storedOriginalPosition, setStoredOriginalPosition] = useState<{
    x: number | 'auto';
    y: number | 'auto';
    width: number;
    height: number;
  }>();
  const [isFixed, setIsFixed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showInside, setShowInside] = useState(false);
  const [hideOutside, setHideOutside] = useState(false);
  const [showSelectAvatar, setShowSelectAvatar] = useState(false);
  const [guest, setGuest] = useState<{ id: number; name: string }>();
  const [viewportDimensions, setViewportDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [characters, setCharacters] = useState<WeddingGuestSprite[]>([]);
  const [loading, setLoading] = useState(false);

  let timer: NodeJS.Timeout;
  let timer2: NodeJS.Timeout;
  let timer3: NodeJS.Timeout;
  let timer4: NodeJS.Timeout;

  const enter = (startImmediately = false) => {
    if (isFixed || isTransitioning || isZooming) {
      return;
    }

    // Set fixed position after a small delay to ensure smooth transition
    timer = setTimeout(
      () => {
        // Get initial position
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setStoredOriginalPosition({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          });
          setContainerDimensions({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          });
          setIsFixed(true);
          const scrollOuter = document.getElementById('scroll-outer');
          if (scrollOuter) {
            scrollOuter.style.overflow = 'visible';
          }
        }
      },
      startImmediately ? 0 : 1000,
    );

    timer2 = setTimeout(
      () => {
        onChangeMusic('info');
        setIsTransitioning(true);
        // expand rect to fill viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        setContainerDimensions({
          x: 0,
          y: 0,
          width: viewportWidth,
          height: viewportHeight,
        });
      },
      startImmediately ? 100 : 1100,
    );

    timer3 = setTimeout(
      () => {
        setIsZooming(true);
        setHideOutside(true);
      },
      startImmediately ? 1100 : 2100,
    );

    timer4 = setTimeout(
      () => {
        setShowInside(true);
      },
      startImmediately ? 2100 : 3100,
    );
  };

  const fetchGuest = async () => {
    const { data } = await client
      .from('wedding_invitation_response')
      .select('*, wedding_guest ( name )')
      .eq('guest_id', guestId)
      .eq('response', 'yes')
      .single();

    setGuest(data ? { id: data.id, name: data.wedding_guest.name } : undefined);
    if (data && !data.sprite_image_url) {
      setShowSelectAvatar(true);
    }
  };

  const fetchCharacters = async () => {
    const { data } = await client
      .from('wedding_invitation_response')
      .select(
        `animation_name, sprite_data_name, sprite_image_url, wedding_guest ( name )`,
      )
      .eq('response', 'yes');
    const allCharacters =
      (data
        ?.filter((d) => d.sprite_image_url)
        .map((d) => ({
          ...d,
          sprite_animation: d.animation_name,
        })) as unknown as WeddingGuestSprite[]) ?? [];
    setCharacters(allCharacters);
  };

  useEffect(() => {
    enter();

    const updateHeight = () => {
      setViewportDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    fetchGuest();
    fetchCharacters();

    updateHeight();
    window.addEventListener('resize', updateHeight);

    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleExit = (view?: 'rsvp' | 'menu' | 'quests') => {
    setShowInside(false);
    setTimeout(() => {
      setHideOutside(false);
      setIsZooming(false);
      setTimeout(() => {
        setContainerDimensions({
          ...storedOriginalPosition!,
        });

        setTimeout(() => {
          setContainerDimensions({
            ...storedOriginalPosition!,
            x: 'auto',
            y: 'auto',
          });
          setIsTransitioning(false);
          setIsFixed(false);
          const scrollOuter = document.getElementById('scroll-outer');
          if (scrollOuter) {
            scrollOuter.style.overflow = 'hidden';
          }
          onChangeMusic('intro');
          if (view) {
            onChangeView(view);
          }
        }, 1100);
      }, 1100);
    }, 500);
  };

  const handleChangeCharacter = async (character: WeddingGuestSprite) => {
    setLoading(true);
    const { error } = await client
      .from('wedding_invitation_response')
      .update({
        sprite_image_url: character.sprite_image_url,
        sprite_data_name: character.sprite_data_name,
        animation_name: character.sprite_animation,
      })
      .eq('guest_id', guestId);

    if (error) {
      console.error(error);
    }

    await fetchCharacters();
    setLoading(false);
    setShowSelectAvatar(false);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const attireIconSize = isMobile ? 48 : 100;
  const tagIconSize = isMobile ? 32 : 42;
  return (
    <>
      <InsideContent className={`${showInside ? 'show-inside' : ''}`}>
        {showSelectAvatar && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              height: '100svh',
              width: '100svw',
              zIndex: 9998,
            }}
            tabIndex={1}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: theme.spacing(2),
                  maxWidth: 900,
                  marginBottom: '100px',
                }}
              >
                {isNew ? (
                  <SelectAvatarTextContent>
                    <Image
                      src={SealImage.src}
                      alt="seal"
                      width={isMobile ? 80 : 120}
                      height={isMobile ? 80 : 120}
                      unoptimized
                    />
                    <h1>Thank you for your response!</h1>
                  </SelectAvatarTextContent>
                ) : (
                  <SelectAvatarTextContent>
                    <h1>Welcome back, {guest?.name}!</h1>
                  </SelectAvatarTextContent>
                )}

                <Box
                  component="p"
                  sx={{
                    fontSize: 16,
                    padding: `0 ${isMobile ? theme.spacing(0) : theme.spacing(1)}`,
                    textAlign: 'center',
                    maxWidth: isMobile ? 350 : 900,
                  }}
                >
                  Grace our virtual halls with your presence. Select your
                  character below!
                </Box>

                <Box
                  sx={{
                    paddingTop: isMobile ? theme.spacing(0) : theme.spacing(2),
                  }}
                >
                  <SelectAvatar
                    name={guest?.name ?? ''}
                    onSelect={handleChangeCharacter}
                    loading={loading}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        <BlurBackground>
          <Box
            sx={{
              width:
                viewportDimensions.width > 1400
                  ? 1400
                  : viewportDimensions.width,
              height: isMobile ? viewportDimensions.height - 100 : 700,
              boxShadow: '0 0 22px rgba(0, 0, 0, 1)',
              position: 'relative',
            }}
          >
            {isMobile && <MobileHeaderBlock />}
            <ExitButton onClick={() => handleExit('rsvp')} />
            <NavBar>
              <Tag simple name="Your RSVP" onClick={() => handleExit('rsvp')}>
                <Image
                  src={RsvpIcon.src}
                  alt="rsvp"
                  width={tagIconSize}
                  height={tagIconSize}
                />
              </Tag>
              <Tag simple name="Sample Menu" onClick={() => handleExit('menu')}>
                <Image
                  src={MealIcon.src}
                  alt="sample menu"
                  width={tagIconSize}
                  height={tagIconSize}
                />
              </Tag>
              <Tag
                simple
                name="Journal Log"
                onClick={() => handleExit('quests')}
              >
                <Image
                  src={QuestIcon.src}
                  alt="quest"
                  width={tagIconSize}
                  height={tagIconSize}
                />
              </Tag>
            </NavBar>

            <Canvas
              orthographic
              gl={{
                pixelRatio: window.devicePixelRatio,
                antialias: false,
              }}
              camera={{
                position: [0, 0, 100],
              }}
            >
              <Scene
                viewportWidth={viewportDimensions.width}
                width={isMobile ? 900 : viewportDimensions.width}
                height={isMobile ? viewportDimensions.height - 100 : 700}
                characters={characters}
                isMobile={isMobile}
              />
            </Canvas>
          </Box>
        </BlurBackground>
        <InfoTitleContent>
          <span>Dave & Ivy&apos;s</span>
          <h1>Wedding Information</h1>
        </InfoTitleContent>
        <InfoSnippet>
          <InfoHeader>
            <span>Where&apos;s it at?</span>
          </InfoHeader>
          <Location>
            <LocationButton /> The Cloisters Castle
          </Location>
          <Subtitle>10440 Falls Rd, Timonium, MD 21093</Subtitle>
        </InfoSnippet>

        <InfoSnippet>
          <InfoHeader>
            <span>Themed Dress Code</span>
          </InfoHeader>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: theme.spacing(4),
              marginBottom: theme.spacing(4),
              gridTemplateColumns: '1fr 1fr 1fr',
            }}
          >
            <Attire
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Image
                src={HatA.src}
                alt="hat"
                width={attireIconSize}
                height={attireIconSize}
              />
              <Image
                src={CoatA.src}
                alt="coat"
                width={attireIconSize}
                height={attireIconSize}
              />
              <Image
                src={ShoesA.src}
                alt="shoes"
                width={attireIconSize}
                height={attireIconSize}
              />
            </Attire>
            <Attire>
              <Image
                src={HatB.src}
                alt="hat"
                width={attireIconSize}
                height={attireIconSize}
              />
              <Image
                src={CoatB.src}
                alt="coat"
                width={attireIconSize}
                height={attireIconSize}
              />
              <Image
                src={ShoesB.src}
                alt="shoes"
                width={attireIconSize}
                height={attireIconSize}
              />
            </Attire>
            <Attire>
              <Image
                src={HatC.src}
                alt="hat"
                width={attireIconSize}
                height={attireIconSize}
              />
              <Image
                src={CoatC.src}
                alt="coat"
                width={attireIconSize}
                height={attireIconSize}
              />
              <Image
                src={ShoesC.src}
                alt="shoes"
                width={attireIconSize}
                height={attireIconSize}
              />
            </Attire>
          </Box>
          <p>
            Attire of medieval, viking, or around that time period preferred.
            Doesn&apos;t need to be historically accurate, fantasy is our thing!
            Bring your best witch&apos;s hat, inflatable dragon costume, or
            potato potato sack. And if you&apos;re really not feeling it, as
            long as it&apos;s regular ol suit or dress, we&apos;ll take it. :D
          </p>
        </InfoSnippet>

        <InfoSnippet>
          <InfoHeader>
            <span>Adults Only</span>
          </InfoHeader>
          <p>
            A friendly remind that this is a grown up party; please leave your
            children in the responsible care of someone we&apos;re not looking
            to hand some drinks to.
          </p>
        </InfoSnippet>

        <InfoSnippet>
          <InfoHeader>
            <span>Live Music</span>
          </InfoHeader>
          <Box
            sx={{
              display: 'grid',
              alignItems: 'center',
              justifyContent: 'center',
              imageRendering: 'pixelated',
              gridTemplateColumns: '1fr 1fr',
              marginTop: theme.spacing(4),
              [theme.breakpoints.down('md')]: {
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(3),
              },
            }}
          >
            <Image
              src={Bards.src}
              alt="bards"
              width={isMobile ? 189 : 378}
              height={isMobile ? 171 : 342}
              unoptimized
            />
            <p>
              Join us in welcoming the Pilgrims of the Deep Run, a Traditional
              Irish band from Baltimore. They&apos;ll be livening up the
              fesitivites with a plethora of pub songs & dance tunes. Check them
              out{' '}
              <a
                href="https://www.thepilgrimsofdeeprun.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </Box>
        </InfoSnippet>

        <InfoSnippet>
          <InfoHeader>
            <span>Shuttle Details</span>
          </InfoHeader>
          <p>
            Details will be posted here closer to the date. Check back soon!
          </p>
        </InfoSnippet>

        <InfoClosing>
          <h4>
            <span>Questions? Hit us up!</span>
          </h4>
          <p>
            We probably missed something, let us know! We&apos;ll be sure to
            this page as we get more information.
          </p>
        </InfoClosing>

        {isMobile && <Box sx={{ width: '100%', height: 84 }} />}
      </InsideContent>
      <EnterChurchButton onClick={() => enter(true)}>
        <BecomeFullscreen
          ref={containerRef}
          style={{
            width: containerDimensions?.width,
            height: containerDimensions?.height,
            top: containerDimensions?.y,
            left: containerDimensions?.x,
            position: isFixed ? 'fixed' : 'relative',
          }}
          className={`${isTransitioning ? 'transition' : ''} ${isZooming ? 'zoom' : ''} ${hideOutside ? 'hide-outside' : ''}`}
        >
          <ChurchBackground src={ChurchBg.src} alt="church background" />
        </BecomeFullscreen>
      </EnterChurchButton>
    </>
  );
};

export default Info;
