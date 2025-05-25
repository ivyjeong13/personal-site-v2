import { Box, styled, useMediaQuery } from '@mui/material';
import { Plane } from '@react-three/drei';
import { Canvas, Vector3, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { SpriteData, WeddingGuestSprite } from '../../../_types';
import { spritesMap } from '../../../_constants';
import PaperBg from '../../../_assets/paper_bg.png';
import ArrowLeft from '../../../_assets/arrow_left.png';
import ArrowRight from '../../../_assets/arrow_right.png';
import Image from 'next/image';
import theme from '@/common/theme';
import { jacquard24, pixelify } from '../../../_fonts';
import ConfirmButtonBg from '../../../_assets/button.png';

const sprites_a = [
  {
    name: 'Lute Bard',
    sprite_animation: 'lutebard',
  },
  {
    name: 'Flute Bard',
    sprite_animation: 'flutebard',
  },
  {
    name: 'Drunkard',
    sprite_animation: 'drunkard',
  },
  {
    name: 'Couple A',
    sprite_animation: 'couplea',
  },
  {
    name: 'Couple B',
    sprite_animation: 'coupleb',
  },
];

const sprites_b = [
  {
    name: 'Crafter',
    sprite_animation: 'crafter',
  },
  {
    name: 'Plague Doctor',
    sprite_animation: 'plaguedoctor',
  },
  {
    name: 'Random Man',
    sprite_animation: 'randomman',
  },
  {
    name: 'Blacksmith',
    sprite_animation: 'blacksmith',
  },
  {
    name: 'Tavern Lady',
    sprite_animation: 'tavernlady',
  },
  {
    name: 'Barmaid',
    sprite_animation: 'barmaid',
  },
  {
    name: 'Barmaid B',
    sprite_animation: 'barmaidb',
  },
  {
    name: 'Barmaid C',
    sprite_animation: 'barmaidc',
  },
  {
    name: 'Pirate',
    sprite_animation: 'pirate',
  },
  {
    name: 'Barmaid D',
    sprite_animation: 'barmaidd',
  },
  {
    name: 'Barman',
    sprite_animation: 'barman',
  },
  {
    name: 'Warrior',
    sprite_animation: 'warrior',
  },
];

const sprites_c = [
  {
    name: 'Barmaid E',
    sprite_animation: 'barmaid',
  },
  {
    name: 'Dancer',
    sprite_animation: 'dancer',
  },
  {
    name: 'Lady',
    sprite_animation: 'lady',
  },
  {
    name: 'Bookworm',
    sprite_animation: 'bookworm',
  },
  {
    name: 'Cat',
    sprite_animation: 'cat',
  },
  {
    name: 'Dog',
    sprite_animation: 'dog',
  },
  {
    name: 'Knight Sit',
    sprite_animation: 'knightsit',
  },
  {
    name: 'Knight w/ Sword',
    sprite_animation: 'knightsword',
  },
  {
    name: 'Knight w/ Beer',
    sprite_animation: 'knightbeer',
  },
  {
    name: 'Axeman',
    sprite_animation: 'axeman',
  },
  {
    name: 'Witch',
    sprite_animation: 'witch',
  },
  {
    name: 'Cook',
    sprite_animation: 'cook',
  },
  {
    name: 'Knight Woman',
    sprite_animation: 'knightwoman',
  },
  {
    name: 'Mage',
    sprite_animation: 'mage',
  },
];

const sprites_d = [
  {
    name: 'Baroness',
    sprite_animation: 'baroness',
  },
];

const sprites_e = [
  {
    name: 'Blackmarket Dealer',
    sprite_animation: 'blackmarket',
  },
];

const sprites_f = [
  {
    name: 'Crusader',
    sprite_animation: 'crusader',
  },
];

const sprites_g = [
  {
    name: 'Fairy',
    sprite_animation: 'fairy',
  },
];

const characters = [
  ...sprites_a.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302588/GandalfHardcore_tavern_NPCs_ujqcvj.png',
    sprite_data_name: 'sprites_a.json',
  })),
  ...sprites_b.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302558/GandalfHardcore_characters_sheet_4_rx1czx.png',
    sprite_data_name: 'sprites_b.json',
  })),
  ...sprites_c.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302559/GandalfHardcore_characters_sheet2_u5hfig.png',
    sprite_data_name: 'sprites_c.json',
  })),
  ...sprites_d.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302714/Baroness_nrqkgm.png',
    sprite_data_name: 'sprites_d.json',
  })),
  ...sprites_e.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302697/Black_Market_Dealer_meoczf.png',
    sprite_data_name: 'sprites_e.json',
  })),
  ...sprites_f.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302680/Crusader_quepbb.png',
    sprite_data_name: 'sprites_f.json',
  })),
  ...sprites_g.map((sprite) => ({
    ...sprite,
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748302680/Fairy_t6wmwl.png',
    sprite_data_name: 'sprites_g.json',
  })),
];

function Character({
  animationFrame,
  textureImageURL,
  textureDataURL,
  isMobile,
}: {
  animationFrame: string;
  textureImageURL: string;
  textureDataURL: string;
  isMobile: boolean;
}) {
  // Position character at center of canvas
  const [position] = useState<number[] & Vector3>([0, 0, 1]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteData, setSpriteData] = useState<SpriteData | null>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
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

  const material = new THREE.MeshBasicMaterial({
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

  const scaleMultiplier = isMobile ? 2 : 4;
  return (
    <Plane
      position={position}
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
  );
}

const Scene = ({
  character,
  isMobile,
}: {
  character: WeddingGuestSprite;
  isMobile: boolean;
}) => {
  return (
    <Suspense fallback={null}>
      <Character
        key={character.sprite_animation}
        animationFrame={character.sprite_animation}
        textureImageURL={character.sprite_image_url}
        textureDataURL={character.sprite_data_name}
        isMobile={isMobile}
      />
    </Suspense>
  );
};

const Button = styled('button')({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  transition: 'transform 0.2s ease-in-out',
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  '&:hover:not(:disabled)': {
    transform: 'scale(1.2)',
  },
});

const ConfirmButton = styled(Button)(({ theme }) => ({
  backgroundImage: `url(${ConfirmButtonBg.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: 300,
  height: 45,
  imageRendering: 'pixelated',
  marginTop: theme.spacing(2),
  color: '#000',
  fontFamily: pixelify.style.fontFamily,
  fontSize: 16,
  fontWeight: 500,
  textTransform: 'uppercase',
  [theme.breakpoints.down('sm')]: {
    marginTop: theme.spacing(0),
  },
}));

const SelectAvatar = ({
  name,
  onSelect,
  loading,
}: {
  name: string;
  onSelect: (character: WeddingGuestSprite) => void;
  loading?: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const height = isMobile ? 300 : 400;
  const width = isMobile ? 200 : 300;
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height,
          imageRendering: 'pixelated',
          gap: theme.spacing(2),
        }}
      >
        <Button
          onClick={() => {
            if (currentIndex === 0) {
              setCurrentIndex(characters.length - 1);
            } else {
              setCurrentIndex(currentIndex - 1);
            }
          }}
        >
          <Image src={ArrowLeft.src} width={50} height={50} alt="arrow left" />
        </Button>
        <Box
          sx={{
            width,
            height,
            backgroundImage: `url(${PaperBg.src})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              fontSize: isMobile ? 42 : 76,
              fontWeight: 500,
              textAlign: 'center',
              position: 'absolute',
              fontFamily: jacquard24.style.fontFamily,
              top: isMobile ? theme.spacing(3) : theme.spacing(2),
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#000',
            }}
          >
            Wanted
          </Box>
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
            <Scene character={characters[currentIndex]} isMobile={false} />
          </Canvas>
          <Box
            sx={{
              position: 'absolute',
              bottom: theme.spacing(4),
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#000',
              fontSize: isMobile ? 18 : 26,
              fontWeight: 500,
              fontFamily: pixelify.style.fontFamily,
              textWrap: 'nowrap',
            }}
          >
            {name}
          </Box>
        </Box>
        <Button
          onClick={() => {
            if (currentIndex === characters.length - 1) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(currentIndex + 1);
            }
          }}
        >
          <Image
            src={ArrowRight.src}
            width={50}
            height={50}
            alt="arrow right"
          />
        </Button>
      </Box>
      <ConfirmButton
        onClick={() => onSelect(characters[currentIndex])}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Select'}
      </ConfirmButton>
    </Box>
  );
};

export default SelectAvatar;
