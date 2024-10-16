export type SkillType = {
  description?: string;
  Icon: React.ElementType;
  title: string;
};

export type SkillsetType = {
  Icon: React.ElementType;
  skills: SkillType[];
  title: string;
};

export type ProjectType = {
  featured: boolean;
  description?: string;
  githubUrl: string | null;
  image: string | null;
  technologies: string[];
  title: string;
  url: string | null;
};
