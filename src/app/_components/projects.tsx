import { Box, Grid2, styled, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { centeredFlexStyles } from '@/common/styles';
import Section from './section';
import Project from './project';
import {
  containerSizes,
  defaultContainerPadding,
  mountainPurple,
} from '../../common/constants';
import { ProjectType } from '../../common/types';
import useIsMobile from '../../common/hooks/use-is-mobile';
import FeaturedProject from './project/featured';
import projectsData from '../_assets/data/projects.json';

const maxTriangleHeight = 600;
const minTriangleHeight = 300;
const BackgroundTriangleA = styled(Box)(({ theme }) => ({
  width: 0,
  height: 0,
  position: 'absolute',
  top: 0,
  left: `calc(50% - ${containerSizes.desktop}px)`,
  transform: `translateX(-50% - ${containerSizes.desktop}px)`,
  borderLeft: `${maxTriangleHeight}px solid ${mountainPurple}`,
  borderRight: `${maxTriangleHeight}px solid ${theme.palette.primary.contrastText}`,
  borderTop: `${minTriangleHeight}px solid ${mountainPurple}`,
}));
const BackgroundTriangleB = styled(Box)(({ theme }) => ({
  width: 0,
  height: 0,
  position: 'absolute',
  top: 0,
  right: `calc(50% - ${containerSizes.desktop}px)`,
  transform: `translateX(-50% - ${containerSizes.desktop}px)`,
  borderLeft: `${maxTriangleHeight}px solid ${theme.palette.primary.contrastText}`,
  borderRight: `${maxTriangleHeight}px solid ${mountainPurple}`,
  borderTop: `${minTriangleHeight}px solid ${mountainPurple}`,
}));
const ContentWithBackground = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrastText,
  width: '100%',
  position: 'relative',
  top: -200,
  paddingBottom: defaultContainerPadding.xxlarge,
  marginBottom: -200,
  display: 'flex',
  justifyContent: 'center',
}));
const FeaturedProjects = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  marginBottom: 36,
});
const NonFeaturedProjects = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
  width: '100%',
  flexGrow: 1,
  padding: '0 16px',
}));
const ProjectsTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 35,
  },
  color: theme.palette.secondary.contrastText,
  fontSize: 100,
  marginTop: defaultContainerPadding.large,
}));
const PurpleContainer = styled(Box)({
  ...centeredFlexStyles,
  width: '100%',
  flexDirection: 'column',
  backgroundColor: mountainPurple,
  overflow: 'hidden',
});

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects: ProjectType[] = projectsData.projects;
  const featuredProjects = projects.filter((project) => project.featured);
  const nonFeaturedProjects = projects.filter((project) => !project.featured);
  const isMobile = useIsMobile();
  return (
    <PurpleContainer ref={ref}>
      <motion.div
        animate={{
          y: isInView ? 0 : 500,
          opacity: isInView ? 1 : 0,
        }}
        initial={{
          y: 500,
          opacity: 0,
        }}
        style={{
          width: 1638,
        }}
      >
        <Box sx={{ height: 300, width: '100%', position: 'relative' }}>
          <BackgroundTriangleA />
          <BackgroundTriangleB />
        </Box>
      </motion.div>
      <ContentWithBackground>
        <Section height="auto" flexDirection="column">
          <Box>
            <ProjectsTitle variant="h3">PROJECTS</ProjectsTitle>
            <Typography
              color="tertiary"
              sx={{
                textAlign: 'center',
              }}
              variant={isMobile ? 'caption' : 'body1'}
            >
              Examples of small side projects I&apos;ve done on my own time for
              fun or to learn.
            </Typography>
            <Typography
              color="tertiary"
              sx={{
                textAlign: 'center',
                paddingBottom: '24px',
              }}
            ></Typography>
          </Box>
          <FeaturedProjects>
            {featuredProjects.map((featuredProject) => (
              <FeaturedProject
                key={featuredProject.title}
                project={featuredProject}
              />
            ))}
          </FeaturedProjects>
          <NonFeaturedProjects>
            <Grid2 container spacing={4}>
              {nonFeaturedProjects.map((project) => (
                <Grid2 key={project.title} size={{ sm: 12, md: 6 }}>
                  <Project key={project.title} project={project} />
                </Grid2>
              ))}
            </Grid2>
          </NonFeaturedProjects>
        </Section>
      </ContentWithBackground>
    </PurpleContainer>
  );
};

export default Projects;
