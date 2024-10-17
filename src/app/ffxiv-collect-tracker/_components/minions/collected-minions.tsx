import { useContext } from 'react';
import Section from '@/app/_components/section';
import { Box } from '@mui/material';
import { centeredFlexStyles } from '@/common/styles';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';
import CollectedItem from '../collected-item';

const CollectedMinions = () => {
  const { character, minions } = useContext(CollectablesContext);
  const collectedMinions = character?.minions ?? [];
  const minionMapSet = new Map(minions.map((minion) => [minion.name, minion]));
  return (
    <Section flexDirection="column" height="auto">
      <HeaderBodyText>Minions</HeaderBodyText>
      <BodyText>
        Yonder lie the companions thou hast forged bonds of friendship with...
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
        {collectedMinions.map((collectedMinion) => {
          const matchingMinionData = minionMapSet.get(collectedMinion.name);
          if (!matchingMinionData) {
            return null;
          }
          return (
            <CollectedItem
              key={matchingMinionData.id}
              item={matchingMinionData}
            />
          );
        })}
      </Box>
    </Section>
  );
};

export default CollectedMinions;
