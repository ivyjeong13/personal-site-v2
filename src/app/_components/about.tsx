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

const Title = styled(Typography)({
  position: 'absolute',
  top: 175,
  right: 'calc(50% - 200px)',
  transform: 'translateX(-50% - 200px)',
  color: grey[900],
  fontSize: 250,
});

const Container = styled(motion.div)({
  borderTopLeftRadius: '10%',
  borderTopRightRadius: '10%',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  marginTop: standardContainerPadding,
});

const BackgroundImage = styled(Image)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 400,
  zIndex: -1,
});

const SolidBackground = styled(Box)({
  alignItems: 'center',
  width: '100%',
  marginTop: 350,
  background: mountainPurple,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

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
        <Section height={600} gap={4}>
          {/* <Typography variant="h4">
      Public APIs to Make Projects With
    </Typography>
    <Typography variant="body1">
      https://github.com/public-apis/public-apis#games--comics
    </Typography>
    <Typography variant="body1">
      https://github.com/public-apis/public-apis#entertainment
    </Typography>
    <Typography variant="body1">
      https://github.com/public-apis/public-apis#anime
    </Typography> */}
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
        </Section>
      </SolidBackground>
    </Container>
  );
};

export default About;
