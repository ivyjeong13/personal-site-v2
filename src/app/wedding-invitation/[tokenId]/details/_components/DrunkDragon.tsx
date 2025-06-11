import { Canvas, Vector3, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { TextureLoader, Texture, MeshBasicMaterial } from 'three';

import { useState, useEffect, useRef } from 'react';
import { SpriteData } from '@/app/wedding-invitation/_types';
import { dragonSpriteMap } from '@/app/wedding-invitation/_constants';

function Character({
  animationFrame,
  textureImageURL,
  textureDataURL,
}: {
  animationFrame: string;
  textureImageURL: string;
  textureDataURL: string;
}) {
  // Position character at center of canvas
  const [position] = useState<number[] & Vector3>([0, 0, 1]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [spriteData, setSpriteData] = useState<SpriteData | null>(null);
  const [texture, setTexture] = useState<Texture | null>(null);
  const frameTime = 1 / 6; // 3 FPS
  const timeRef = useRef(0);
  const prevAnimationFrameRef = useRef(animationFrame);

  // Reset currentFrame when animationFrame changes
  useEffect(() => {
    if (prevAnimationFrameRef.current !== animationFrame) {
      setCurrentFrame(0);
      prevAnimationFrameRef.current = animationFrame;
    }
  }, [animationFrame]);

  // Load sprite sheet and data
  useEffect(() => {
    const loadResources = async () => {
      try {
        const textureLoader = new TextureLoader();
        const loadedTexture = await textureLoader.loadAsync(textureImageURL);
        loadedTexture.minFilter = loadedTexture.magFilter = THREE.NearestFilter;

        const jsonData = dragonSpriteMap.get(textureDataURL) as SpriteData;

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

  const scaleMultiplier = 5;

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
    </group>
  );
}

const frames = [
  {
    sprite_animation: 'dragonidle',
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748638491/drunk_dragon_idle_94x76_ii48wc.png',
    sprite_data_name: 'drunk_dragon_idle.json',
  },
  {
    sprite_animation: 'dragonhurt',
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748638491/drunk_dragon_hurt_90x76_pa4dhn.png',
    sprite_data_name: 'drunk_dragon_hurt.json',
  },
  {
    sprite_animation: 'dragondeath',
    sprite_image_url:
      'https://res.cloudinary.com/dwnebujkh/image/upload/v1748638491/drunk_dragon_death_110x76_kizj2r.png',
    sprite_data_name: 'drunk_dragon_death.json',
  },
];

const Scene = ({ death }: { death: boolean }) => {
  const [character, setCharacter] = useState(frames[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return; // Prevent multiple clicks during animation

    setIsAnimating(true);
    setCharacter(frames[1]); // Switch to hurt animation

    // After hurt animation completes, switch back to idle
    setTimeout(() => {
      setCharacter(frames[0]);
      setIsAnimating(false);
    }, 850); // Adjust timing based on your animation duration
  };

  useEffect(() => {
    if (death) {
      setCharacter(frames[2]);
    } else {
      setCharacter(frames[0]);
    }
  }, [death]);

  return (
    <group onClick={handleClick}>
      <Character
        animationFrame={character.sprite_animation}
        textureImageURL={character.sprite_image_url}
        textureDataURL={character.sprite_data_name}
      />
    </group>
  );
};

const DrunkDragon = ({ death }: { death: boolean }) => {
  return (
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
      <Scene death={death} />
    </Canvas>
  );
};

export default DrunkDragon;
