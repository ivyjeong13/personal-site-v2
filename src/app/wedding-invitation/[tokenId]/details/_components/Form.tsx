import { styled } from '@mui/material';
import { jacquard24, pixelify } from '../../../_fonts';
import SealImage from '../../../_assets/stamp_seal.png';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const Title = styled('h1')(({ theme }) => ({
  fontSize: 182,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
}));

const Date = styled('h2')(({ theme }) => ({
  fontSize: 48,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

const Subtitle = styled('h2')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  marginTop: -24,
}));

const Substitle2 = styled('h2')(({ theme }) => ({
  fontSize: 28,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
}));

const RSVP = styled('h4')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 300,
  marginTop: theme.spacing(4),
}));

const RespondBy = styled('p')(({ theme }) => ({
  fontSize: 20,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 300,
  textAlign: 'right',
  paddingRight: theme.spacing(2),
}));

const ResponseItem = styled('button')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  color: '#000',
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  fontSize: 24,
  justifyItems: 'center',
  gap: theme.spacing(2),
  '&:hover': {
    '& b': {
      textDecoration: 'underline',
      color: '#ab0916',
      textDecorationColor: '#ab0916',
    },
  },
  '& img': {
    flexShrink: 0,
  },
}));

const Response = styled('b')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  transition: 'color 0.3s ease, text-decoration 0.3s ease',
  textDecoration: 'underline transparent',
}));

const ResponseItemPlaceholder = styled('div')(({ theme }) => ({
  width: 100,
  height: 100,
  borderBottom: '2px solid #000',
}));

const AltResponseItemPlaceholder = styled('div')(({ theme }) => ({
  width: 65,
  height: 65,
  borderBottom: '2px solid #000',
  flexShrink: 0,
}));

const SecondaryQuestion = styled('div')(({ theme }) => ({
  textAlign: 'left',
  '& > p': {
    fontSize: 36,
    fontFamily: jacquard24.style.fontFamily,
    fontWeight: 400,
  },
  '& > span': {
    fontSize: 18,
    fontFamily: pixelify.style.fontFamily,
    fontWeight: 400,
    display: 'inline-block',
  },
}));

const TertiaryQuestion = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(4),
  '& > p': {
    fontSize: 36,
    fontFamily: jacquard24.style.fontFamily,
    fontWeight: 400,
  },
  '& > span': {
    fontSize: 18,
    fontFamily: pixelify.style.fontFamily,
    fontWeight: 400,
    display: 'inline-block',
  },
  '& > input, & > button': {
    marginTop: theme.spacing(2),
  },
}));

const SubmitButton = styled('button')(({ theme }) => ({
  marginTop: theme.spacing(4),
  backgroundColor: '#623a0a',
  color: '#fff',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  fontSize: 32,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  boxShadow:
    'inset 2px 2px 0px 0px rgba(0, 0, 0, 0.5), inset -2px -2px 0px 0px rgba(255, 255, 255, 0.2)',
  border: 'none',
  '&:hover': {
    backgroundColor: '#4a2c08',
    boxShadow:
      'inset 1px 1px 0px 0px rgba(0, 0, 0, 0.5), inset -1px -1px 0px 0px rgba(255, 255, 255, 0.2)',
  },
}));

const ErrorMessage = styled('p')(({ theme }) => ({
  fontSize: 16,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  color: '#ab0916',
  textAlign: 'center',
  marginTop: theme.spacing(2),
  transition: 'opacity 0.3s ease',
}));

const FirstQuestion = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(6),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const Form = ({
  tokenId,
  onSuccess,
}: {
  tokenId: string;
  onSuccess: () => void;
}) => {
  const client = createClient();
  const [fields, setFields] = useState<{
    id?: number;
    response?: 'yes' | 'no';
    plus_one?: boolean;
    hotel?: boolean;
    food_restrictions?: string;
  }>({
    response: undefined,
    plus_one: undefined,
    hotel: undefined,
    food_restrictions: undefined,
  });
  const [error, setError] = useState<string>();

  const init = async () => {
    const { data } = await client
      .from('wedding_invitation_response')
      .select('*')
      .eq('token_id', tokenId);

    const invitation = data?.[0];
    if (invitation) {
      setFields({
        response: invitation.response,
        plus_one: invitation.plus_one,
        hotel: invitation.hotel,
        food_restrictions: invitation.food_restrictions,
        id: invitation.id,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = async () => {
    let error;
    if (fields.id) {
      const response = await client
        .from('wedding_invitation_response')
        .update({
          response: fields.response,
          plus_one: fields.plus_one,
          hotel: fields.hotel,
          food_restrictions: fields.food_restrictions,
        })
        .eq('id', fields.id);
      error = response.error;
    } else {
      const response = await client.from('wedding_invitation_response').insert({
        response: fields.response,
        plus_one: fields.plus_one,
        hotel: fields.hotel,
        food_restrictions: fields.food_restrictions,
        token_id: tokenId,
      });
      error = response.error;
    }

    if (error) {
      setError(error.message);
    } else {
      onSuccess?.();
    }
  };

  return (
    <>
      <Title>Dave & Ivy</Title>
      <Subtitle>The Cloisters Castle</Subtitle>
      <Substitle2>10440 Falls Rd, Timonium, MD 21093</Substitle2>

      <Date>November 9th, 2025</Date>

      <RSVP>Thy response is humbly beseeched</RSVP>
      <RespondBy>Please respond by 9/1/2025</RespondBy>

      <FirstQuestion>
        <ResponseItem onClick={() => setFields({ ...fields, response: 'yes' })}>
          {fields.response === 'yes' ? (
            <img src={SealImage.src} alt="stamp" width={100} height={100} />
          ) : (
            <ResponseItemPlaceholder />
          )}
          <Response>Verily!</Response> I am prepared to make merry!
        </ResponseItem>
        <ResponseItem onClick={() => setFields({ ...fields, response: 'no' })}>
          {fields.response === 'no' ? (
            <img src={SealImage.src} alt="stamp" width={100} height={100} />
          ) : (
            <ResponseItemPlaceholder />
          )}
          <Response>No!</Response> My feline beast is aflame.
        </ResponseItem>
      </FirstQuestion>

      <ResponseItem
        onClick={() => setFields({ ...fields, plus_one: !fields.plus_one })}
      >
        {fields.plus_one ? (
          <img src={SealImage.src} alt="stamp" width={65} height={65} />
        ) : (
          <AltResponseItemPlaceholder />
        )}
        <SecondaryQuestion>
          <p>A companion (+1) will be joining me.</p>
          <span>
            Note: Due to the nature of the festivities, we request that children
            stay at home. We wish all guests to indulge in appropriate
            inebriation.
          </span>
        </SecondaryQuestion>
      </ResponseItem>

      <TertiaryQuestion>
        <p>Do you or your plus one have any dietary restrictions?</p>
        <span>
          A menu of what food that will be provided as an example is available
          (see here) This is highly tentative and will be finalized closer to
          the date.
        </span>
      </TertiaryQuestion>

      <TertiaryQuestion>
        <p>Would you like to book a hotel with the party?</p>

        <ResponseItem onClick={() => setFields({ ...fields, hotel: true })}>
          {fields.hotel === true ? (
            <img src={SealImage.src} alt="stamp" width={65} height={65} />
          ) : (
            <AltResponseItemPlaceholder />
          )}
          <SecondaryQuestion>
            <p>Yes, book me a room!</p>
            <span>
              We will be providing a shuttle to and from the wedding venue.
              Details TBD.
            </span>
          </SecondaryQuestion>
        </ResponseItem>

        <ResponseItem onClick={() => setFields({ ...fields, hotel: false })}>
          {fields.hotel === false ? (
            <img src={SealImage.src} alt="stamp" width={65} height={65} />
          ) : (
            <AltResponseItemPlaceholder />
          )}
          <SecondaryQuestion>
            <p>No, I&apos;m good.</p>
            <span>
              I will be making my own arrangements or I live locally and do not
              need a hotel.
            </span>
          </SecondaryQuestion>
        </ResponseItem>
      </TertiaryQuestion>

      <SubmitButton onClick={handleSubmit}>Submit Response</SubmitButton>
      <ErrorMessage style={{ opacity: error ? 1 : 0 }}>
        Alas, an error occurred. Please try again or contact the Lord or Lady of
        the event.
      </ErrorMessage>
    </>
  );
};

export default Form;
