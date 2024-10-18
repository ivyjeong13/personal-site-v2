import {
  defaultContainerPadding,
  defaultInputPadding,
} from '@/common/constants';
import { Box, Paper, styled, Typography, useTheme } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { centeredFlexStyles } from '@/common/styles';
import useIsMobile from '@/common/hooks/use-is-mobile';

type Props = {
  title: string;
  Icon?: React.ReactElement;
  children: React.ReactNode;
};

const SkillsetPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down(1200)]: {
    width: 400,
  },
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    marginBottom: 0,
    width: '100%',
  },
  background: theme.palette.primary.contrastText,
  width: 275,
  position: 'relative',
  height: 465,
}));

const Title = styled(motion.div)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    paddingTop: defaultInputPadding.medium + 24,
  },
  paddingTop: defaultInputPadding.medium + 35,
  paddingBottom: defaultInputPadding.medium,
  textAlign: 'center',
}));

const Content = styled(Box)({
  padding: defaultContainerPadding.medium,
});

const IconContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: 50,
    height: 50,
    top: -25,
  },
  ...centeredFlexStyles,
  position: 'absolute',
  top: -35,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 70,
  height: 70,
  background: theme.palette.primary.contrastText,
  borderRadius: '50%',
}));

const Skillset = ({ title, Icon = <WebIcon />, children }: Props) => {
  const [isHovering, setHovering] = useState(false);
  const theme = useTheme();
  const isMobile = useIsMobile();

  return (
    <SkillsetPaper
      elevation={1}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <IconContainer>
        <motion.div
          animate={{
            scale: isHovering ? 1.3 : 1,
          }}
          initial={false}
        >
          {Icon}
        </motion.div>
      </IconContainer>
      <Title
        animate={{
          backgroundColor: isHovering
            ? theme.palette.primary.main
            : theme.palette.tertiary.main,
        }}
        initial={false}
      >
        <Typography variant={isMobile ? 'body1' : 'h6'}>{title}</Typography>
      </Title>
      <Content>{children}</Content>
    </SkillsetPaper>
  );
};

export default Skillset;
