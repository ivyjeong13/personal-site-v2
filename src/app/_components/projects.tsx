import { Box, Grid2, styled, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { mountainPurple, standardContainerPadding } from '../_constants';
import { grey, indigo } from '@mui/material/colors';
import Section from './section';
import Project from './project';
import { ProjectType } from '../_types';
import useIsMobile from '../_hooks/use-is-mobile';

const ProjectsTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 35,
  },
  color: grey[900],
  fontSize: 100,
  marginTop: standardContainerPadding,
}));
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
    <Box
      ref={ref}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: mountainPurple,
        overflow: 'hidden',
      }}
    >
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
          <Box
            sx={{
              width: 0,
              height: 0,
              position: 'absolute',
              top: 0,
              left: 'calc(50% - 1200px)',
              transform: 'translateX(-50% - 1200px)',
              borderLeft: `600px solid ${mountainPurple}`,
              borderRight: `600px solid ${indigo[50]}`,
              borderTop: `300px solid ${mountainPurple}`,
            }}
          />
          <Box
            sx={{
              width: 0,
              height: 0,
              position: 'absolute',
              top: 0,
              right: 'calc(50% - 1200px)',
              transform: 'translateX(-50% - 1200px)',
              borderLeft: `600px solid ${indigo[50]}`,
              borderRight: `600px solid ${mountainPurple}`,
              borderTop: `300px solid ${mountainPurple}`,
            }}
          />
        </Box>
      </motion.div>
      <Box
        sx={{
          backgroundColor: indigo[50],
          width: '100%',
          position: 'relative',
          top: -200,
          paddingBottom: '48px',
          marginBottom: '-200px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Section height="auto" flexDirection="column">
          <Box>
            <ProjectsTitle variant="h3">PROJECTS</ProjectsTitle>
            <Typography
              sx={{
                color: grey[900],
                textAlign: 'center',
              }}
              variant={isMobile ? 'caption' : 'body1'}
            >
              Examples of small solo projects I&apos;ve done on my own time.
            </Typography>
            <Typography
              sx={{
                color: grey[900],
                textAlign: 'center',
                paddingBottom: '24px',
              }}
            ></Typography>
          </Box>
          <Box sx={{ width: '100%', flexGrow: 1 }}>
            <Grid2 container spacing={4}>
              {projects.map((project) => (
                <Grid2 key={project.title} size={{ sm: 12, md: 6 }}>
                  <Project key={project.title} project={project} />
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </Section>
      </Box>
    </Box>
  );
};

export default Projects;
