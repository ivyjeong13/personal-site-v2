import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Box, Chip, styled, Typography } from '@mui/material';
import { ProjectType } from '@/common/types';
import { GithubIcon } from '@/common/assets/icons';
import {
  defaultInputPadding,
  standardBorderRadius,
  standardGap,
} from '@/common/constants';
import Image from 'next/image';
import Link from 'next/link';
import Placeholder from '../../_assets/images/Code_k1IJv9gHDD.png';

type Props = {
  project: ProjectType;
};

const Content = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: standardGap,
  },
  gap: 16,
  display: 'flex',
}));

const PlaceholderImage = styled(Image)({
  filter: 'blur(2px)',
  height: 150,
});

export const Technologies = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: standardGap,
  marginTop: defaultInputPadding.medium,
});

const TechnologyChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  borderRadius: standardBorderRadius,
  fontSize: '11px',
}));

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
            delay: 0.3,
          },
        },
      }}
    >
      <Content>
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
          <Typography color="primary" variant="body1">
            <b>{project.title}</b>{' '}
            {project.githubUrl && (
              <Link href={project.githubUrl} target="_blank">
                <GithubIcon color="primary" fontSize="small" />
              </Link>
            )}
          </Typography>
          <Typography color="tertiary" variant="caption">
            {project.description}
          </Typography>
        </Box>
      </Content>
      <Technologies>
        {project.technologies.map((technology, i) => (
          <TechnologyChip key={i} label={technology} variant="outlined" />
        ))}
      </Technologies>
    </motion.div>
  );
};

export default Project;
