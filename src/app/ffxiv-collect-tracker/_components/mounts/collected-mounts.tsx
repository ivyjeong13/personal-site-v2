import { useContext, useEffect, useState } from 'react';
import Section from '@/app/_components/section';
import { Box, styled } from '@mui/material';
import { centeredFlexStyles } from '@/common/styles';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';
import CollectedItem from '../collected-item';
import { Mount } from '../../_types';

const LoadMoreButton = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  marginTop: theme.spacing(1),
}));

const initialRows = 3;
const numberOfItemsPerRow = 16;
const CollectedMounts = () => {
  const [visible, setVisible] = useState<Mount[]>([]);
  const [collectedMounts, setCollectedMounts] = useState<Mount[]>([]);
  const { character, mounts } = useContext(CollectablesContext);

  useEffect(() => {
    const mountMapSet = new Map(mounts.map((mount) => [mount.name, mount]));
    const dataToUse = (character?.mounts ?? [])
      .map((mount) => mountMapSet.get(mount.name))
      .filter((mount) => !!mount)
      .sort((mountA, mountB) => mountA.id - mountB.id);

    setCollectedMounts(dataToUse);
    setVisible(dataToUse.slice(0, initialRows * numberOfItemsPerRow));
  }, [mounts, character]);

  const canLoadMore = visible.length < collectedMounts.length;
  const handleLoadMore = () => {
    if (canLoadMore) {
      const start = visible.length;
      const nextEnd = start + initialRows * numberOfItemsPerRow;
      const end =
        nextEnd > collectedMounts.length ? collectedMounts.length : nextEnd;
      const nextItems = collectedMounts.slice(start, end);
      setVisible([...visible, ...nextItems]);
    }
  };

  return (
    <Section flexDirection="column" height="auto">
      <HeaderBodyText>Mounts</HeaderBodyText>
      <BodyText>
        Verily, these are the noble steeds thou hast brought under thine
        influence...
      </BodyText>
      <Box
        sx={{
          ...centeredFlexStyles,
          gap: 1,
          flexWrap: 'wrap',
          maxWidth: 800,
          marginTop: 2,
        }}
      >
        {visible.map((collectedMount) => (
          <CollectedItem key={collectedMount.id} item={collectedMount} />
        ))}
      </Box>
      {canLoadMore && (
        <LoadMoreButton onClick={handleLoadMore}>
          <BodyText>See More...</BodyText>
        </LoadMoreButton>
      )}
    </Section>
  );
};

export default CollectedMounts;
