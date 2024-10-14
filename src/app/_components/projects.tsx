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
  borderRight: `${maxTriangleHeight} solid ${theme.palette.primary.contrastText}`,
  borderTop: `${minTriangleHeight} solid ${mountainPurple}`,
}));
const BackgroundTriangleB = styled(Box)(({ theme }) => ({
  width: 0,
  height: 0,
  position: 'absolute',
  top: 0,
  right: `calc(50% - ${containerSizes.desktop}px)`,
  transform: `translateX(-50% - ${containerSizes.desktop}px)`,
  borderLeft: `${maxTriangleHeight} solid ${theme.palette.primary.contrastText}`,
  borderRight: `${maxTriangleHeight} solid ${mountainPurple}`,
  borderTop: `${minTriangleHeight} solid ${mountainPurple}`,
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

  const projects: ProjectType[] = [
    {
      title: '[Coming Soon]',
      githubUrl: null,
      url: null,
      description: 'A silly idea; an interactive Tamagotchi powered by OpenAI.',
      image: null,
      technologies: ['OpenAI API', 'React', 'Emotion (CSS-in-JS)', 'Express'],
    },
    {
      title: '[Coming Soon]',
      githubUrl: null,
      url: null,
      description:
        'A completionist tracker for my character in Final Fantasy XIV.',
      image: null,
      technologies: [
        'Vue',
        'SASS',
        'Universalis API',
        'FFXIV Collect API',
        'XIVAPI',
      ],
    },
    {
      title: 'Trending Twitter By Country',
      githubUrl: 'https://github.com/ivyjeong13/twitter-google-trending-react',
      url: null,
      description:
        '(2018) A web app where you could navigate by country and get the top trending tweets happening in the area. Utilized Simple Maps and Twitter API. Created in React.',
      image: null,
      technologies: ['React', 'React Simple Maps', 'Twitter API'],
    },
    {
      title: 'Pro Gamer',
      githubUrl: 'https://github.com/ivyjeong13/progamer-web',
      url: null,
      description:
        '(2018) Another small web application that listed video games like a library and displayed upcoming progamer tournaments for the game the user had selected. Utilized Giant Bomb and PandaScore API. Created in AngularJS.',
      image: null,
      technologies: ['AngularJS', 'SCSS'],
    },
    {
      title: 'Shale D&D Calculator',
      githubUrl: 'https://github.com/ivyjeong13/heroku-dnd-test',
      url: null,
      description:
        '(2020) A calculator app to determine damage given and received based on own stats, own skills used, and buffs from fellow party members that were active during a fight. It made trying to figure out the numbers on the spot a lot quicker!',
      image: null,
      technologies: ['React'],
    },
  ];

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
              Examples of small solo projects I&apos;ve done on my own time.
            </Typography>
            <Typography
              color="tertiary"
              sx={{
                textAlign: 'center',
                paddingBottom: '24px',
              }}
            ></Typography>
          </Box>
          <Box sx={{ width: '100%', flexGrow: 1, padding: '0 16px' }}>
            <Grid2 container spacing={4}>
              {projects.map((project) => (
                <Grid2 key={project.title} size={{ sm: 12, md: 6 }}>
                  <Project key={project.title} project={project} />
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Section>
      </ContentWithBackground>
    </PurpleContainer>
  );
};

export default Projects;
