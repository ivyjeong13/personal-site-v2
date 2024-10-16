import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import FeedIcon from '@mui/icons-material/Feed';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { centeredFlexStyles } from '@/common/styles';
import Skillset from './skillset';
import { SkillsetType } from '../../common/types';
import * as icons from '../_assets/icons';
import Section from './section';
import background from '../_assets/images/pexels-eberhardgross-12486830.jpg';
import {
  defaultContainerPadding,
  mountainPurple,
} from '../../common/constants';

const Container = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  borderTopLeftRadius: '10%',
  borderTopRightRadius: '10%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  marginTop: defaultContainerPadding.large,
}));

const BackgroundImage = styled(Image)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: '100%',
  },
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 400,
  zIndex: -1,
}));

const ListContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 36,
  },
  justifyContent: 'center',
  position: 'relative',
  top: -defaultContainerPadding.large,
  display: 'flex',
  flexWrap: 'wrap',
  rowGap: 48,
  columnGap: 24,
}));

const SolidBackground = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: 150,
    background: 'transparent',
  },
  ...centeredFlexStyles,
  width: '100%',
  marginTop: 360,
  background: mountainPurple,
}));

const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down(1200)]: {
    fontSize: 190,
    right: 'calc(50%)',
    transform: 'translateX(50%)',
    top: 140,
  },
  [theme.breakpoints.down('md')]: {
    top: defaultContainerPadding.large,
    fontSize: 64,
  },
  position: 'absolute',
  top: 120,
  right: 'calc(50% - 100px)',
  transform: 'translateX(-50% - 100px)',
  fontSize: 220,
}));

const variants = {
  hidden: {
    opacity: 0,
    bottom: -600,
  },
  visible: {
    opacity: 1,
    bottom: 0,
  },
};

const About = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    controls.start('visible');
  }, [isInView]);

  const skillsets: SkillsetType[] = [
    {
      title: 'Languages',
      Icon: FeedIcon,
      skills: [
        {
          title: 'Typescript',
          Icon: icons.TypescriptIcon,
        },
        {
          title: 'Javascript',
          Icon: icons.JavascriptIcon,
        },
        {
          title: 'CSS',
          Icon: icons.Css3Icon,
        },
        {
          title: 'HTML',
          Icon: icons.Html5Icon,
        },
        {
          title: 'Python',
          Icon: icons.PythonIcon,
        },
      ],
    },
    {
      title: 'Front-end',
      Icon: ComputerIcon,
      skills: [
        {
          title: 'React',
          Icon: icons.ReactIcon,
        },
        {
          title: 'Next.js',
          Icon: icons.NextJsIcon,
        },
        {
          title: 'AngularJS',
          Icon: icons.AngularJsIcon,
        },
        {
          title: 'Django',
          Icon: icons.DjangoIcon,
        },
        {
          title: 'MaterialUI',
          Icon: icons.MaterialUiIcon,
        },
        {
          title: 'Jest',
          Icon: icons.JestIcon,
          description: 'With React-Testing-Library',
        },
      ],
    },
    {
      title: 'Back-end',
      Icon: StorageIcon,
      skills: [
        {
          title: 'Node.js',
          Icon: icons.NodeJsIcon,
        },
        {
          title: 'Fastify',
          Icon: icons.FastifyIcon,
        },
        {
          title: 'PostgresSQL',
          Icon: icons.PostgresSQLIcon,
        },
        {
          title: 'MongoDB',
          Icon: icons.MongoDbIcon,
        },
        {
          title: 'ViTest',
          Icon: icons.ViTestIcon,
        },
      ],
    },
    {
      title: 'General Knowledge',
      Icon: ModelTrainingIcon,
      skills: [
        {
          title: 'Confluence',
          Icon: icons.ConfluenceIcon,
        },
        {
          title: 'Jira',
          Icon: icons.JiraIcon,
        },
        {
          title: 'CircleCI',
          Icon: icons.CircleCiIcon,
        },
        {
          title: 'Docker',
          Icon: icons.DockerIcon,
        },
        {
          title: 'GitHub',
          Icon: icons.GithubIcon,
          description: '(Also Copilot)',
        },
        {
          title: 'VSCode',
          Icon: icons.VsCodeIcon,
        },
      ],
    },
  ];

  return (
    <Container
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <Title color="tertiary" variant="h3">
        SKILLS
      </Title>
      <BackgroundImage
        alt="pexels-eberhardgross-12486830.jpg"
        src={background}
      />
      <SolidBackground>
        <Section height="auto">
          <ListContainer>
            {skillsets.map(({ Icon, title, skills }) => (
              <Skillset
                key={title}
                Icon={<Icon fontSize="large" />}
                title={title}
              >
                <List>
                  {skills.map(({ title, description, Icon: SkillIcon }) => (
                    <ListItem key={title}>
                      <ListItemAvatar>
                        <SkillIcon />
                      </ListItemAvatar>
                      <ListItemText
                        primary={title}
                        primaryTypographyProps={{ color: 'tertiary' }}
                        secondary={description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Skillset>
            ))}
          </ListContainer>
        </Section>
      </SolidBackground>
    </Container>
  );
};

export default About;
