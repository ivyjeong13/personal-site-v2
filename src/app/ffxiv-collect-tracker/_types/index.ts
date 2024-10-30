export type XivCharacter = {
  id: number;
  active_class: string;
  current_title: string;
  data_center: string;
  free_company: string;
  gender: string;
  guardian_diety: {
    name: string;
    thumbnail_url: string;
  };
  level: number;
  minions: {
    name: string;
    image_url: string;
  }[];
  mounts: {
    name: string;
    image_url: string;
  }[];
  name: string;
  nameday: string; // birthday
  portrait_url: string;
  race: string;
  rank: string | null;
  starting_town: string;
  total_minions: number;
  total_mounts: number;
  tribe: string;
  world: string;
};

export type CollectableSource = {
  type: string;
  text: string;
  related_type: string | null;
  related_id: number | null;
};

export type Mount = {
  id: number;
  name: string;
  description: string;
  enhanced_description: string;
  tooltip: string;
  movement: string;
  seats: number;
  patch: string;
  image: string;
  icon: string;
  sources: CollectableSource[];
};

export type Minion = {
  id: number;
  name: string;
  behavior: {
    id: number;
    name: string;
  };
  description: string;
  enhanced_description: string;
  path: string;
  image: string;
  icon: string;
  sources: CollectableSource[];
};

export type CollectableContextType = {
  character: XivCharacter | null;
  minions: Minion[];
  mounts: Mount[];
  totalMinions: number;
  totalMounts: number;
};
