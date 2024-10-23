import { useContext } from 'react';
import { Box, styled, Typography } from '@mui/material';
import CollectablesContext from '../../_context/collectables';
import { BodyText, TitleBodyText } from '..';

const InlineTitleBodyText = styled(TitleBodyText)({
  display: 'inline-block',
}) as typeof Typography;

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
      <BodyText component="span">
        <InlineTitleBodyText component="span">
          {character.tribe}
        </InlineTitleBodyText>
        , whose renown has earned their title of{' '}
        <InlineTitleBodyText component="span">
          {character.current_title}
        </InlineTitleBodyText>
        ,
      </BodyText>
      <BodyText component="span">
        Whose steps mark the vastness of{' '}
        <InlineTitleBodyText component="span">
          {character.data_center}
        </InlineTitleBodyText>{' '}
        and lands of{' '}
        <InlineTitleBodyText component="span">
          {character.world}
        </InlineTitleBodyText>
        ,
      </BodyText>
      <BodyText component="span">
        Under the watchful eyes of{' '}
        <InlineTitleBodyText component="span">
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
          : 'Have you caught them all?'}
      </InlineTitleBodyText>
    </InfoContent>
  ) : null;
};

export default CharacterInfo;
