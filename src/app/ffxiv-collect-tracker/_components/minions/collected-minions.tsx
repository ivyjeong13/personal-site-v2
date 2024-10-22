import { useContext, useEffect, useState } from 'react';
import Section from '@/app/_components/section';
import { Box, styled } from '@mui/material';
import { centeredFlexStyles } from '@/common/styles';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';
import CollectedItem from '../collected-item';
import { Minion } from '../../_types';

const LoadMoreButton = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  marginTop: theme.spacing(1),
}));

const initialRows = 3;
const numberOfItemsPerRow = 16;
const CollectedMinions = () => {
  const [visible, setVisible] = useState<Minion[]>([]);
  const [collectedMinions, setCollectedMinions] = useState<Minion[]>([]);
  const { character, minions } = useContext(CollectablesContext);

  useEffect(() => {
    const minionMapSet = new Map(
      minions.map((minion) => [minion.name, minion]),
    );
    const dataToUse = (character?.minions ?? [])
      .map((minion) => minionMapSet.get(minion.name))
      .filter((minion) => !!minion)
      .sort((minionA, minionB) => minionA.id - minionB.id);

    setCollectedMinions(dataToUse);
    setVisible(dataToUse.slice(0, initialRows * numberOfItemsPerRow));
  }, [minions, character]);

  const canLoadMore = visible.length < collectedMinions.length;
  const handleLoadMore = () => {
    if (canLoadMore) {
      const start = visible.length;
      const nextEnd = start + initialRows * numberOfItemsPerRow;
      const end =
        nextEnd > collectedMinions.length ? collectedMinions.length : nextEnd;
      const nextItems = collectedMinions.slice(start, end);
      setVisible([...visible, ...nextItems]);
    }
  };

  const text =
    collectedMinions.length > 0
      ? 'Yonder lie the companions thou hast forged bonds of friendship with...'
      : 'Thy companions surely await...';
  return (
    <Section flexDirection="column" height="auto">
      <HeaderBodyText>Minions</HeaderBodyText>
      <BodyText>{text}</BodyText>
      <Box
        sx={{
          ...centeredFlexStyles,
          gap: 1,
          flexWrap: 'wrap',
          maxWidth: 800,
          marginTop: 2,
        }}
      >
        {visible.map((collectedMinion) => (
          <CollectedItem key={collectedMinion.id} item={collectedMinion} />
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

export default CollectedMinions;
