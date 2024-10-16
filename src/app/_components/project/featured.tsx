import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ProjectType } from '@/common/types';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Chip, styled, Typography as MuiTypography } from '@mui/material';
import {
  defaultContainerPadding,
  standardBorderRadius,
} from '@/common/constants';
import { Technologies } from '.';
import useIsMobile from '@/common/hooks/use-is-mobile';

type Props = {
  project: ProjectType;
};

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minHeight: 200,
    height: 'auto',
    padding: `0px ${defaultContainerPadding.medium}px`,
  },
  width: '100%',
  height: 300,
  position: 'relative',
  borderRadius: standardBorderRadius,
  overflow: 'hidden',
}));

const FeaturedProjectContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    position: 'revert',
    bottom: 'unset',
    left: 'unset',
  },
  position: 'absolute',
  bottom: defaultContainerPadding.medium,
  left: defaultContainerPadding.medium,
}));

const TitleTypography = styled(MuiTypography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  color: theme.palette.primary.contrastText,
}));

const Typography = styled(MuiTypography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.tertiary.main,
  },
  color: theme.palette.primary.contrastText,
}));

const SplashImage = styled(Image)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
});

const TechnologyChip = styled(Chip)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    background: 'transparent',
  },
  color: theme.palette.primary.contrastText,
  border: `1px solid ${theme.palette.primary.contrastText}`,
  borderRadius: standardBorderRadius,
  fontSize: '11px',
}));

const FeaturedProject = ({ project }: Props) => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      style={{ width: '100%', zIndex: 1 }}
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
      <Link href={project.url ?? ''}>
        <Container>
          {isMobile ? (
            <img
              alt="featured_project_image_mobile.jpg"
              src={project.image ?? ''}
              width="100%"
              height={260}
              style={{ borderRadius: standardBorderRadius }}
            />
          ) : (
            <SplashImage
              alt="featured_project_image.jpeg"
              src={project.image ?? ''}
              fill
            />
          )}

          <FeaturedProjectContent>
            <TitleTypography variant={isMobile ? 'body1' : 'h4'}>
              {project.title}
            </TitleTypography>
            <Typography variant={isMobile ? 'caption' : 'subtitle1'}>
              {project.description}
            </Typography>
            <Technologies>
              {project.technologies.map((technology, i) => (
                <TechnologyChip key={i} label={technology} />
              ))}
            </Technologies>
          </FeaturedProjectContent>
        </Container>
      </Link>
    </motion.div>
  );
};

export default FeaturedProject;
