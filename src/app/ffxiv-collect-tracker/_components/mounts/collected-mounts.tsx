import { useContext } from 'react';
import Section from '@/app/_components/section';
import { Box } from '@mui/material';
import { centeredFlexStyles } from '@/common/styles';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';
import CollectedItem from '../collected-item';

const CollectedMounts = () => {
  const { character, mounts } = useContext(CollectablesContext);
  const collectedMounts = character?.mounts ?? [];
  const mountMapSet = new Map(mounts.map((mount) => [mount.name, mount]));
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
        {collectedMounts.map((collectedMount) => {
          const matchingMountData = mountMapSet.get(collectedMount.name);
          if (!matchingMountData) {
            return null;
          }
          return (
            <CollectedItem
              key={matchingMountData.id}
              item={matchingMountData}
            />
          );
        })}
      </Box>
    </Section>
  );
};

export default CollectedMounts;
