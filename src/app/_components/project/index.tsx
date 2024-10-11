import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Box, Chip, styled, Typography } from '@mui/material';
import { grey, indigo } from '@mui/material/colors';
import { ProjectType } from '@/common/types';
import { GithubIcon } from '@/app/assets/icons';
import {
  defaultBoxShadow,
  defaultInputPadding,
  standardBorderRadius,
  standardGap,
} from '@/common/constants';
import Image from 'next/image';
import Link from 'next/link';
import Placeholder from '../../assets/images/Code_k1IJv9gHDD.png';

type Props = {
  project: ProjectType;
};

const Content = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
  gap: 16,
  display: 'flex',
}));

const PlaceholderImage = styled(Image)({
  filter: 'blur(2px)',
  height: 150,
});

const Technologies = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: standardGap,
  marginTop: defaultInputPadding.medium,
});

const TechnologyChip = styled(Chip)({
  color: indigo[800],
  borderColor: indigo[300],
  borderRadius: standardBorderRadius,
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
            boxShadow: defaultBoxShadow,
          }}
        >
          <PlaceholderImage alt="placeholder.png" src={Placeholder} />
        </Box>
        <Box sx={{ width: '100%', color: grey[900] }}>
          <Typography variant="body1" sx={{ color: indigo[500] }}>
            <b>{project.title}</b>
          </Typography>
          <Typography variant="caption">{project.description}</Typography>
          {project.githubUrl && (
            <Box>
              <Link href={project.githubUrl} target="_blank">
                <GithubIcon fontSize="small" />
              </Link>
            </Box>
          )}
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
