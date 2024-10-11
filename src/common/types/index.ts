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

export type ProjectType = {
  title: string;
  description?: string;
  githubUrl: string | null;
  url: string | null;
  image: string | null;
  technologies: string[];
};
