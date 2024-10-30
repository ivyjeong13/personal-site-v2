'use client';

import Section from '@/app/_components/section';
import { centeredFlexStyles } from '@/common/styles';
import { XivIcon } from '@/common/assets/icons';
import { Box, styled, TextField } from '@mui/material';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import Footer from '../../../_components/footer';
import Header from '../../../_components/header';
import CollectablesContext from '../../../_context/collectables';
import { Mount, XivCharacter } from '../../../_types';
import bannerImage from '../../../_assets/dVxANNz.jpeg';
import { PageContainer, TitleBodyText } from '../../../_components';
import { amber, brown } from '@mui/material/colors';
import UnownedMountList from './_components/unowned-list';
import OwnedMountList from './_components/owned-list';
import MountResults from './_components/mount-results';
import { debounce } from 'lodash';

type Props = {
  character: XivCharacter | null;
  mounts: {
    results: Mount[];
    total: number;
  };
};

const SplashContainer = styled(Box)({
  ...centeredFlexStyles,
  height: 350,
  position: 'relative',
  width: '100%',
});

const SearchField = styled(TextField)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  borderRadius: theme.spacing(0.5),
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px 0px',
  width: '100%',
  '& .MuiInputBase-input, & .MuiInputBase-adornedEnd': {
    color: theme.palette.primary.contrastText,
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    color: `${amber.A700}`,
  },
  '& .Mui-focused': {
    '&:after': {
      color: amber.A700,
      borderBottom: `2px solid ${amber[700]}`,
    },
    color: amber.A700,
  },
}));

const MountButton = styled('button')({
  ...centeredFlexStyles,
  backgroundColor: brown.A700,
  border: 0,
  cursor: 'pointer',
  height: 48,
  width: '50%',
  '&:hover': {
    backgroundColor: brown[800],
  },
});

const selectedBoxShadow =
  'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset';
const unselectedBoxShadow = 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px';

enum ViewEnum {
  Owned = 'owned',
  Unowned = 'unowned',
  SearchResults = 'search_results',
}

const Content = ({ character, mounts }: Props) => {
  const [searchText, setSearchText] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedView, setSelectedView] = useState<ViewEnum>(ViewEnum.Unowned);

  const views = [
    {
      key: ViewEnum.Unowned,
      component: <UnownedMountList />,
      name: 'Unowned',
    },
    {
      key: ViewEnum.Owned,
      component: <OwnedMountList />,
      name: 'Owned',
    },
    {
      key: ViewEnum.SearchResults,
      component: <MountResults searchText={searchText} />,
      name: 'Search For Mount',
    },
  ];

  const tabViews = [views[0], views[1]];

  const ComponentToShow = views.find(
    (view) => view.key === selectedView,
  )?.component;

  const updateSearchValue = useCallback(
    debounce((newSearchValue: string) => {
      setSearchValue(newSearchValue);
    }, 300),
    [],
  );
  return (
    <CollectablesContext.Provider
      value={{
        character,
        minions: [],
        mounts: mounts.results,
        totalMinions: 0,
        totalMounts: mounts.total,
      }}
    >
      <Header />
      <SplashContainer>
        <Image alt="banner_image.jpeg" fill priority src={bannerImage} />
      </SplashContainer>
      <PageContainer sx={{ paddingTop: 1 }}>
        <Section flexDirection="column" height="auto">
          <SearchField
            label="Search Mounts..."
            onChange={(event) => {
              setSearchText(event.target.value);
              updateSearchValue(event.target.value);
            }}
            slotProps={{
              input: {
                endAdornment: <XivIcon />,
              },
            }}
            variant="filled"
          />
        </Section>
        {searchValue.length > 2 ? (
          <MountResults searchText={searchValue} />
        ) : (
          <>
            <Box sx={{ width: '100%', display: 'flex' }}>
              {tabViews.map((view) => (
                <MountButton
                  onClick={() => setSelectedView(view.key)}
                  key={view.key}
                  sx={{
                    boxShadow:
                      selectedView === view.key
                        ? selectedBoxShadow
                        : unselectedBoxShadow,
                  }}
                  aria-label={`Select to view ${view.name} mounts.`}
                >
                  <TitleBodyText>{view.name}</TitleBodyText>
                </MountButton>
              ))}
            </Box>
            <Section flexDirection="column" height="auto">
              {ComponentToShow}
            </Section>
          </>
        )}
      </PageContainer>
      <Footer />
    </CollectablesContext.Provider>
  );
};

export default Content;
