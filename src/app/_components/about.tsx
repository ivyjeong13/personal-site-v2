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
import Section from './section';
import background from '../assets/images/pexels-eberhardgross-12486830.jpg';
import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Skillset from './skillset';
import { SkillsetType } from '../_types';
import {
  AngularJsIcon,
  CircleCiIcon,
  ConfluenceIcon,
  Css3Icon,
  DjangoIcon,
  DockerIcon,
  FastifyIcon,
  GithubIcon,
  Html5Icon,
  JavascriptIcon,
  JestIcon,
  JiraIcon,
  MaterialUiIcon,
  MongoDbIcon,
  NextJsIcon,
  NodeJsIcon,
  PostgresSQLIcon,
  PythonIcon,
  ReactIcon,
  TypescriptIcon,
  ViTestIcon,
  VsCodeIcon,
} from '../assets/icons';
import { mountainPurple, standardContainerPadding } from '../_constants';
import { grey } from '@mui/material/colors';
import useIsMobile from '../_hooks/use-is-mobile';

const Title = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    top: 24,
    right: 'calc(50% - 102px)',
    transform: 'translateX(-50% - 102px)',
    fontSize: 64,
  },
  position: 'absolute',
  top: 132,
  right: 'calc(50% - 100px)',
  transform: 'translateX(-50% - 100px)',
  color: grey[900],
  fontSize: 220,
}));

const ListContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: 36,
  },
  position: 'relative',
  top: -24,
  display: 'flex',
  gap: 24,
}));

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
  marginTop: standardContainerPadding,
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

const SolidBackground = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    marginTop: 150,
    background: 'transparent',
  },
  alignItems: 'center',
  width: '100%',
  marginTop: 360,
  background: mountainPurple,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
  const isMobile = useIsMobile();

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
          Icon: TypescriptIcon,
        },
        {
          title: 'Javascript',
          Icon: JavascriptIcon,
        },
        {
          title: 'CSS',
          Icon: Css3Icon,
        },
        {
          title: 'HTML',
          Icon: Html5Icon,
        },
        {
          title: 'Python',
          Icon: PythonIcon,
        },
      ],
    },
    {
      title: 'Front-end',
      Icon: ComputerIcon,
      skills: [
        {
          title: 'React',
          Icon: ReactIcon,
        },
        {
          title: 'Next.js',
          Icon: NextJsIcon,
        },
        {
          title: 'AngularJS',
          Icon: AngularJsIcon,
        },
        {
          title: 'Django',
          Icon: DjangoIcon,
        },
        {
          title: 'MaterialUI',
          Icon: MaterialUiIcon,
        },
        {
          title: 'Jest',
          Icon: JestIcon,
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
          Icon: NodeJsIcon,
        },
        {
          title: 'Fastify',
          Icon: FastifyIcon,
        },
        {
          title: 'PostgresSQL',
          Icon: PostgresSQLIcon,
        },
        {
          title: 'MongoDB',
          Icon: MongoDbIcon,
        },
        {
          title: 'ViTest',
          Icon: ViTestIcon,
        },
      ],
    },
    {
      title: 'General Knowledge',
      Icon: ModelTrainingIcon,
      skills: [
        {
          title: 'Confluence',
          Icon: ConfluenceIcon,
        },
        {
          title: 'Jira',
          Icon: JiraIcon,
        },
        {
          title: 'CircleCI',
          Icon: CircleCiIcon,
        },
        {
          title: 'Docker',
          Icon: DockerIcon,
        },
        {
          title: 'GitHub',
          Icon: GithubIcon,
          description: '(Also Copilot)',
        },
        {
          title: 'VSCode',
          Icon: VsCodeIcon,
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
      <Title variant="h3">SKILLS</Title>
      <BackgroundImage
        alt="pexels-eberhardgross-12486830.jpg"
        src={background}
      />
      <SolidBackground>
        <Section height={isMobile ? 'auto' : 500}>
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
                      <ListItemText primary={title} secondary={description} />
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
