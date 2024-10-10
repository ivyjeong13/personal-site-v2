import { Box, Grid2, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { mountainPurple } from '../_constants';
import { grey, indigo } from '@mui/material/colors';
import Section from './section';
import Project from './project';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: 'a',
    },
    {
      title: 'b',
    },
    {
      title: 'c',
    },
    {
      title: 'd',
    },
  ];

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
            <Typography sx={{ color: grey[900], fontSize: 175 }} variant="h3">
              PROJECTS
            </Typography>
            <Typography
              sx={{
                color: grey[900],
                textAlign: 'center',
              }}
              variant="body1"
            >
              Examples of small solo projects I&apos;ve done on my own time.
            </Typography>
            <Typography
              sx={{
                color: grey[900],
                textAlign: 'center',
                paddingBottom: '24px',
              }}
            >
              <b>(Currently under re-construction.)</b>
            </Typography>
          </Box>
          <Box sx={{ width: '100%', flexGrow: 1 }}>
            <Grid2 container spacing={2}>
              {projects.map((project) => (
                <Grid2 key={project.title} size={{ sm: 12, md: 6 }}>
                  <Project key={project.title} />
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
