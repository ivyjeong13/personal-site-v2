export type XivCharacter = {
  /**
   *   active_class: z.string(),
  current_title: z.string().nullable(),
  data_center: z.string(),
  free_company: z.string().nullable(),
  gender: z.string(),
  guardian_diety: z.object({
    name: z.string(),
    thumbnail_url: z.string(),
  }),
  level: z.number().int(),
  name: z.string(),
  nameday: z.string(),
  minions: z.array(
    z.object({
      name: z.string(),
      image_url: z.string(),
    }),
  ),
  mounts: z.array(
    z.object({
      name: z.string(),
      image_url: z.string(),
    }),
  ),
  portrait_url: z.string(),
  race: z.string(),
  rank: z.string().nullable(),
  starting_town: z.string(),
  tribe: z.string(),
  world: z.string(),
   */
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
