import { useContext } from 'react';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';
import Section from '@/app/_components/section';
import { Box } from '@mui/material';
import Image from 'next/image';
import { centeredFlexStyles } from '@/common/styles';

const CollectedMounts = () => {
  const { character, mounts } = useContext(CollectablesContext);
  console.log(character?.mounts, mounts);
  const collectedMounts = character?.mounts ?? [];
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
          const matchingMountData = mounts.find(
            (mount) => mount.name === collectedMount.name,
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

export default CollectedMounts;
