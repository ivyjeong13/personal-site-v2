import { useContext } from 'react';
import CollectablesContext from '../../_context/collectables';
import { BodyText, HeaderBodyText } from '..';
import Section from '@/app/_components/section';

const CollectedMinions = () => {
  const { character } = useContext(CollectablesContext);
  console.log(character?.minions);
  return (
    <Section flexDirection="column" height="auto">
      <HeaderBodyText>Minions</HeaderBodyText>
      <BodyText>
        Yonder lie the companions thou hast forged bonds of friendship with...
      </BodyText>
    </Section>
  );
};

export default CollectedMinions;
