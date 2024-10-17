import { useContext } from 'react';
import Section from '@/app/_components/section';
import { Box } from '@mui/material';
import Image from 'next/image';
import { centeredFlexStyles } from '@/common/styles';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';

const CollectedMinions = () => {
  const { character, minions } = useContext(CollectablesContext);
  const collectedMinions = character?.minions ?? [];
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
          const matchingMountData = minions.find(
            (minion) => minion.name === collectedMinion.name,
          );
          if (!matchingMountData) {
            return null;
          }
          return (
            <Image
              alt={matchingMountData.name}
              key={matchingMountData.id}
              src={matchingMountData.icon}
              height={40}
              width={40}
            />
          );
        })}
      </Box>
    </Section>
  );
};

export default CollectedMinions;
