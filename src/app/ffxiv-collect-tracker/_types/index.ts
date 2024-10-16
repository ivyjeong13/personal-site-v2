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
  current_title: string;
  name: string;
  minions: {
    name: string;
    image_url: string;
  }[];
  mounts: {
    name: string;
    image_url: string;
  }[];
  total_minions: number;
  total_mounts: number;
};
