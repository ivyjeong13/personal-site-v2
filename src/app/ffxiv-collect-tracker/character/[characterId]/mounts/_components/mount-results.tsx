import Section from '@/app/_components/section';
import {
  BodyText,
  TitleBodyText,
} from '@/app/ffxiv-collect-tracker/_components';
import CollectablesContext from '@/app/ffxiv-collect-tracker/_context/collectables';
import { cinzel } from '@/app/ffxiv-collect-tracker/_fonts';
import { Box, Grid2, styled } from '@mui/material';
import Fuse from 'fuse.js';
import Image from 'next/image';
import { useContext } from 'react';

type Props = {
  searchText: string;
};

const Content = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-start',
  position: 'relative',
});

const CollectedBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontFamily: cinzel.style.fontFamily,
  fontSize: 42,
  fontWeight: 600,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 0.25,
}));

const Divider = styled(Box)(({ theme }) => ({
  height: 1,
  width: '100%',
  backgroundColor: theme.palette.primary.contrastText,
  margin: `${theme.spacing(1)} 0px`,
  opacity: 0.25,
}));

const MountResults = ({ searchText }: Props) => {
  const { character, mounts } = useContext(CollectablesContext);
  const characterMounts = new Set(
    (character?.mounts ?? []).map((mount) => mount.name),
  );
  const fuseOptions = {
    includeScore: false,
    keys: [
      {
        name: 'name',
        weight: 0.8,
      },
      {
        name: 'description',
        weight: 0.3,
      },
    ],
  };

  const fuse = new Fuse(mounts, fuseOptions);
  const results = fuse.search(searchText);

  return (
    <Section height="auto">
      <Grid2 container spacing={2}>
        {results.map(({ item }, index) => (
          <Grid2 key={item.id} size={{ md: 12, sm: 12 }}>
            <Content>
              <Image
                src={item.image}
                alt={`${item.image}, description: ${item.description}`}
                height={120}
                width={120}
                unoptimized
              />
              <Box>
                <TitleBodyText>{item.name}</TitleBodyText>
                <BodyText variant="caption">{item.tooltip}</BodyText>
              </Box>
              {characterMounts.has(item.name) && (
                <CollectedBox>Collected</CollectedBox>
              )}
            </Content>
            {index !== results.length - 1 && <Divider />}
          </Grid2>
        ))}
      </Grid2>
    </Section>
  );
};

export default MountResults;
