'use client';

import { centeredFlexStyles } from '@/common/styles';
import { Box, styled, Typography as MuiTypography } from '@mui/material';
import Image from 'next/image';
import { Uncial_Antiqua } from 'next/font/google';
import useIsMobile from '@/common/hooks/use-is-mobile';
import bannerImage from './_assets/dVxANNz.jpeg';
import MountCounter from './_components/mounts/mount-counter';
import MinionCounter from './_components/minions/minion-counter';
import { Minion, Mount, XivCharacter } from './_types';
import CollectablesContext from './_context/collectables';
import CollectedMounts from './_components/mounts/collected-mounts';
import CollectedMinions from './_components/minions/collected-minions';
import Header from './_components/header';
import Footer from './_components/footer';
import CharacterInfo from './_components/character-info';
import Section from '../_components/section';
import { cinzel, thasadith } from './_fonts';
import { PageContainer } from './_components';

const uncialAntiqua = Uncial_Antiqua({
  weight: '400',
  subsets: ['latin'],
});

const MobileCounterDisplay = styled(Box)(({ theme }) => ({
  ...centeredFlexStyles,
  justifyContent: 'space-evenly',
  width: '100%',
  margin: `${theme.spacing(4)} 0`,
}));

const SplashContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    height: '75vh',
    minHeight: 'auto',
  },
  ...centeredFlexStyles,
  height: '100vh',
  minHeight: 845,
  position: 'relative',
  width: '100%',
  '& > img': {
    height: '100%',
  },
}));

const SplashBottomContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },
  bottom: 0,
  left: 0,
  padding: theme.spacing(3),
  position: 'absolute',
  width: '100%',
}));

// adjust bottom if first 7 characters contains
// a l, k, d, tall-letters
const Subheader = styled(MuiTypography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    bottom: 8,
    left: 0,
    fontSize: 12,
  },
  bottom: -8,
  fontFamily: cinzel.style.fontFamily,
  fontSize: 18,
  fontWeight: 600,
  left: 100,
  position: 'relative',
}));

const Title = styled(MuiTypography)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    fontSize: 64,
    lineHeight: 1,
  },
  lineHeight: 1,
  fontFamily: uncialAntiqua.style.fontFamily,
  fontSize: 125,
}));

const Typography = styled('span')({
  fontFamily: thasadith.style.fontFamily,
  fontWeight: 400,
  lineHeight: 1.5,
});

type Props = {
  character: XivCharacter | null;
  minions: {
    results: Minion[];
    total: number;
  };
  mounts: {
    results: Mount[];
    total: number;
  };
};

const Content = ({ character, minions, mounts }: Props) => {
  const isMobile = useIsMobile();
  return (
    <CollectablesContext.Provider
      value={{
        character,
        minions: minions.results,
        mounts: mounts.results,
        totalMinions: minions.total,
        totalMounts: mounts.total,
      }}
    >
      <Header />
      <SplashContainer>
        <Image alt="banner_image.jpeg" priority src={bannerImage} />
        <SplashBottomContent>
          <Subheader>Final Fantasy XIV Completionist Tracker</Subheader>
          <Title>{character?.name ?? ''}</Title>
        </SplashBottomContent>
        {!isMobile && <MountCounter />}
        {!isMobile && <MinionCounter />}
      </SplashContainer>
      <PageContainer>
        {isMobile && (
          <MobileCounterDisplay>
            <MountCounter />
            <MinionCounter />
          </MobileCounterDisplay>
        )}

        <CharacterInfo />
        <CollectedMounts />
        <CollectedMinions />
        <Section flexDirection="column" height="auto">
          <Typography sx={{ padding: 2 }}>
            More Info/Features Coming Soon! <br /> <br />
            <ul>
              <li>Mount/Minions remaining and where to get them</li>
              <li>Add Achievements</li>
              <li>Add Maxed Leveled Classes</li>
              <li>Add Relic Weapon Completions</li>
              <li>Add Claim Character</li>
              <li>
                Add &quot;Requests&quot; Board -- Find Like-minded Warriors of
                Light To Accomplish Goals!
              </li>
              <li>
                Add &quot;Bounty Board&quot; -- Weekly/Monthly Goals to Get
                Closer to Completionist Status!
              </li>
            </ul>
          </Typography>
        </Section>
      </PageContainer>
      <Footer />
    </CollectablesContext.Provider>
  );
};

export default Content;
