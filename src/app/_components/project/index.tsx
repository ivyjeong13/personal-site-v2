import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Section from '../section';
import { Box, Chip, styled, Typography } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import { ProjectType } from '@/app/_types';
import { GithubIcon } from '@/app/assets/icons';
import Image from 'next/image';
import Link from 'next/link';
import Placeholder from '../../assets/images/Code_k1IJv9gHDD.png';
import { standardBorderRadius } from '@/app/_constants';

type Props = {
  project: ProjectType;
};

const ProjectDescription = styled(Typography)({
  color: grey[900],
});

const PlaceholderImage = styled(Image)({
  filter: 'blur(2px)',
  height: 150,
});

const TechnologyChip = styled(Chip)({
  color: indigo[800],
  borderColor: indigo[300],
  borderRadius: '8px',
  fontSize: '11px',
});

const Project = ({ project }: Props) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      style={{ width: '100%' }}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 1,
          },
        },
      }}
    >
      <Section height="auto" gap={2}>
        <Box
          sx={{
            width: '100%',
            height: 150,
            overflow: 'hidden',
            borderRadius: `${standardBorderRadius}px`,
          }}
        >
          <PlaceholderImage alt="placeholder.png" src={Placeholder} />
        </Box>
        <Box sx={{ width: '100%' }}>
          <ProjectDescription variant="body1" sx={{ color: indigo[500] }}>
            <b>{project.title}</b>
          </ProjectDescription>
          <ProjectDescription variant="caption">
            {project.description}
          </ProjectDescription>
          {project.githubUrl && (
            <Box>
              <Link href={project.githubUrl} target="_blank">
                <GithubIcon fontSize="small" />
              </Link>
            </Box>
          )}
        </Box>
      </Section>
      <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
        {project.technologies.map((technology, i) => (
          <TechnologyChip key={i} label={technology} variant="outlined" />
        ))}
      </Box>
    </motion.div>
  );
};

export default Project;
