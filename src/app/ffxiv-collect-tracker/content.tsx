'use client';

import { centeredFlexStyles } from '@/common/styles';
import { Box, styled, Typography as MuiTypography } from '@mui/material';
import Image from 'next/image';
import { Cinzel, Thasadith, Uncial_Antiqua } from 'next/font/google';
import bannerImage from './_assets/dVxANNz.jpeg';
import MountCounter from './_components/mount-counter';
import MinionCounter from './_components/minion-counter';
import { XivCharacter } from './_types';

const uncialAntiqua = Uncial_Antiqua({
  weight: '400',
  subsets: ['latin'],
});

const cinzel = Cinzel({
  weight: ['400', '600'],
  subsets: ['latin'],
});

const thasadith = Thasadith({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const Container = styled(Box)({
  ...centeredFlexStyles,
  backgroundColor: '#110f0f',
  minHeight: 300,
  width: '100%',
});

const SplashContainer = styled(Box)({
  ...centeredFlexStyles,
  height: '100vh',
  minHeight: 845,
  position: 'relative',
  width: '100%',
  '& > img': {
    height: '100%',
  },
});

const SplashBottomContent = styled(Box)(({ theme }) => ({
  bottom: 0,
  left: 0,
  padding: theme.spacing(3),
  position: 'absolute',
  width: '100%',
}));

const Subheader = styled(MuiTypography)({
  bottom: -64,
  fontFamily: cinzel.style.fontFamily,
  fontSize: 18,
  fontWeight: 600,
  left: 100,
  position: 'relative',
});

const Title = styled(MuiTypography)({
  fontFamily: uncialAntiqua.style.fontFamily,
  fontSize: 125,
});

const Typography = styled('span')({
  fontFamily: thasadith.style.fontFamily,
  fontWeight: 400,
  lineHeight: 1.5,
});

type Props = {
  character: XivCharacter | null;
};

const Content = ({ character }: Props) => {
  return (
    <>
      <SplashContainer>
        <Image alt="banner_image.jpeg" src={bannerImage} />
        <SplashBottomContent>
          <Subheader>Final Fantasy XIV Completionist Tracker</Subheader>
          <Title>{character?.name ?? ''}</Title>
        </SplashBottomContent>
        <MountCounter count={character?.total_mounts} />
        <MinionCounter count={character?.total_minions} />
      </SplashContainer>
      <Container>
        <Typography>
          More Info Coming Soon! <br /> <br />
          <ul>
            <li>What Mounts/Minions have been collected</li>
            <li>Where to get Mount/Minions remaining</li>
            <li>Add Achievements</li>
            <li>Select a different Character to track from XIV</li>
          </ul>
        </Typography>
      </Container>
    </>
  );
};

export default Content;
