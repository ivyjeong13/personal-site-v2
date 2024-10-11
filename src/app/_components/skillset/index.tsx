import {
  defaultContainerPadding,
  defaultInputPadding,
} from '@/common/constants';
import { Box, Paper, styled, Typography } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import { grey, indigo } from '@mui/material/colors';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { centeredFlexStyles } from '@/common/styles';

type Props = {
  title: string;
  Icon?: React.ReactElement;
  children: React.ReactNode;
};

const SkillsetPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: 'auto',
    marginBottom: defaultContainerPadding.large,
  },
  background: indigo[50],
  width: 275,
  position: 'relative',
  height: 465,
}));

const Title = styled(motion.div)({
  color: indigo[50],
  paddingTop: defaultInputPadding.medium + 35,
  paddingBottom: defaultInputPadding.medium,
  textAlign: 'center',
});

const Content = styled(Box)({
  padding: defaultContainerPadding.medium,
});

const IconContainer = styled(Box)({
  ...centeredFlexStyles,
  position: 'absolute',
  top: -35,
  left: '50%',
  transform: 'translateX(-50%)',
  width: 70,
  height: 70,
  background: indigo[50],
  borderRadius: '50%',
});

const Skillset = ({ title, Icon = <WebIcon />, children }: Props) => {
  const [isHovering, setHovering] = useState(false);

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
          backgroundColor: isHovering ? indigo[500] : grey[900],
        }}
        initial={false}
      >
        <Typography variant="h6">{title}</Typography>
      </Title>
      <Content>{children}</Content>
    </SkillsetPaper>
  );
};

export default Skillset;
