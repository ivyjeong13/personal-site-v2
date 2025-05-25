export type WeddingGuest = {
  name: string;
  can_plus_one: boolean;
  guests?: number;
};

export type WeddingGuestSprite = {
  name: string;
  sprite_image_url: string;
  sprite_data_name: string;
  sprite_animation: string;
};

export type LayerProps = {
  image: string;
  width: number;
  height: number;
};

export type SpritePosition = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SpriteData = {
  frames: {
    [key: string]: {
      frame: SpritePosition;
      rotated: boolean;
      trimmed: boolean;
      spriteSourceSize: SpritePosition;
      sourceSize: {
        w: number;
        h: number;
      };
    };
  };
  meta: {
    app: string;
    version: string;
    image: string;
    format: string;
    size: {
      w: number;
      h: number;
    };
    scale: number;
  };
};
