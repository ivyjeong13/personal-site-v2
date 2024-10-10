export type SkillType = {
  title: string;
  description?: string;
  Icon: React.ElementType;
};

export type SkillsetType = {
  title: string;
  Icon: React.ElementType;
  skills: SkillType[];
};
