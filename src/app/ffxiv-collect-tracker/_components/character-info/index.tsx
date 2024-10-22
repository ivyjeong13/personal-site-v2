import { useContext } from 'react';
import { Box, styled } from '@mui/material';
import CollectablesContext from '../../_context/collectables';
import { BodyText, TitleBodyText } from '..';

const InlineTitleBodyText = styled(TitleBodyText)({
  display: 'inline-block',
});

const InfoContent = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: 0,
  },
  display: 'flex',
  gap: theme.spacing(2),
  flexDirection: 'column',
  padding: `${theme.spacing(4)} 0px`,
  borderBottom: `1px solid ${theme.palette.primary.contrastText}`,
}));

const CharacterInfo = () => {
  const { character, minions, mounts } = useContext(CollectablesContext);
  const hasCollectedAll =
    (character?.minions ?? []).length === minions.length &&
    (character?.mounts ?? []).length === mounts.length;

  return character ? (
    <InfoContent>
      <BodyText>
        <InlineTitleBodyText>{character.tribe}</InlineTitleBodyText>, whose
        renown has earned their title of{' '}
        <InlineTitleBodyText>{character.current_title}</InlineTitleBodyText>,
      </BodyText>
      <BodyText>
        Whose steps mark the vastness of{' '}
        <InlineTitleBodyText>{character.data_center}</InlineTitleBodyText> and
        lands of <InlineTitleBodyText>{character.world}</InlineTitleBodyText>,
      </BodyText>
      <BodyText>
        Under the watchful eyes of{' '}
        <InlineTitleBodyText>
          {character.guardian_diety.name}
        </InlineTitleBodyText>
        ,
      </BodyText>
      <InlineTitleBodyText
        sx={{
          marginTop: 1,
          width: '100%',
          textAlign: 'center',
          fontSize: 22,
        }}
      >
        {hasCollectedAll
          ? 'Thou hadst surmounted the insurmountable.'
          : 'Have you truly caught them all?'}
      </InlineTitleBodyText>
    </InfoContent>
  ) : null;
};

export default CharacterInfo;
