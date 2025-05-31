'use client';

import { Box, styled, useMediaQuery } from '@mui/material';
import { jacquard24, pixelify } from '../../../_fonts';
import SealImage from '../../../_assets/stamp_seal.png';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import theme from '@/common/theme';
import Image from 'next/image';
import Banner from '../../../_assets/decorated_banner.png';
import Church from '../../../_assets/fb37.png';
import ConfirmButtonBg from '../../../_assets/button.png';

const Title = styled('h1')(({ theme }) => ({
  fontSize: 182,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 64,
  },
}));

const MiniTitle = styled('p')(({ theme }) => ({
  fontSize: 42,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  transform: 'translateY(-22px)',
  margin: '0 auto',
  [theme.breakpoints.down('md')]: {
    fontSize: 22,
    transform: 'translateY(0px)',
    lineHeight: '22px',
    padding: '0 24px',
  },
}));

const LocationContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundImage: `url(${Banner.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  imageRendering: 'pixelated',
  width: '100%',
  height: 268,
  marginTop: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    height: 135,
    margin: '52px 0 0 0',
    '& > *': {
      position: 'relative',
      top: -28,
    },
  },
}));

const Date = styled('h2')(({ theme }) => ({
  fontSize: 48,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  marginTop: theme.spacing(1),

  [theme.breakpoints.down('md')]: {
    fontSize: 22,
  },
}));

const Subtitle = styled('h2')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    fontSize: 32,
    marginTop: theme.spacing(1),
  },
}));

const Substitle2 = styled('h2')(({ theme }) => ({
  fontSize: 28,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    fontSize: 14,
  },
}));

const RSVP = styled('h4')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 300,
  marginTop: theme.spacing(4),

  [theme.breakpoints.down('md')]: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const RespondBy = styled('p')(({ theme }) => ({
  fontSize: 20,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 300,
  textAlign: 'right',
  paddingRight: theme.spacing(2),
  '& > span': {
    fontSize: 32,
    fontFamily: jacquard24.style.fontFamily,
    paddingLeft: theme.spacing(0.5),
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
    '& > span': {
      fontSize: 22,
    },
  },
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
    imageRendering: 'pixelated',
  },

  [theme.breakpoints.down('md')]: {
    fontSize: 13,
    gap: theme.spacing(1),
  },
}));

const Response = styled('b')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  transition: 'color 0.3s ease, text-decoration 0.3s ease',
  textDecoration: 'underline transparent',

  [theme.breakpoints.down('md')]: {
    fontSize: 30,
  },
}));

const ResponseItemPlaceholder = styled('div')(({ theme }) => ({
  width: 100,
  height: 100,
  borderBottom: '2px solid #000',
  flexShrink: 0,

  [theme.breakpoints.down('md')]: {
    width: 48,
    height: 48,
  },
}));

const AltResponseItemPlaceholder = styled('div')(({ theme }) => ({
  width: 65,
  height: 65,
  borderBottom: '2px solid #000',
  flexShrink: 0,

  [theme.breakpoints.down('md')]: {
    width: 32,
    height: 32,
  },
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
  [theme.breakpoints.down('md')]: {
    '& > p': {
      fontSize: 24,
    },
    '& > span': {
      fontSize: 13,
    },
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
  [theme.breakpoints.down('md')]: {
    '& > p': {
      fontSize: 24,
    },
    '& > span': {
      fontSize: 13,
    },
  },
}));

const SubmitButton = styled('button')(({ theme }) => ({
  marginTop: theme.spacing(6),
  backgroundImage: `url(${ConfirmButtonBg.src})`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: 64,
  cursor: 'pointer',
  imageRendering: 'pixelated',
  color: '#000',
  fontFamily: pixelify.style.fontFamily,
  fontSize: 24,
  fontWeight: 500,
  textTransform: 'uppercase',
  border: 0,
  outline: 'none',
  backgroundColor: 'transparent',
  transition: 'transform 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    height: 42,
    fontSize: 14,
    marginTop: theme.spacing(4),
  },
  '&:hover': {
    transform: 'scale(1.05)',
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
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(6),
  '& > button + button': {
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
  },
}));

const Input = styled('input')(({ theme }) => ({
  backgroundColor: '#e1bd8e',
  color: '#343232',
  fontSize: 18,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  outline: 'none',
  border: 'none',
  boxShadow: 'inset 0 1px 4px rgba(57, 34, 11, 0.15)',
  '&::placeholder': {
    color: '#906f44',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 14,
    padding: theme.spacing(1),
    borderRadius: theme.spacing(0.5),
  },
}));

const Form = ({
  guestId,
  onSuccess,
  disabledFields,
  showWithUs,
}: {
  guestId: number;
  onSuccess: (response: 'yes' | 'no', isNew: boolean) => void;
  disabledFields?: string[] | null;
  showWithUs?: boolean;
}) => {
  const client = createClient();
  const [fields, setFields] = useState<{
    id?: number;
    response?: 'yes' | 'no';
    plus_one?: boolean;
    hotel?: number; // 0 - no, 1 - yes, 2 - staying with us
    food_restrictions?: string;
  }>({
    response: undefined,
    plus_one: undefined,
    hotel: undefined,
    food_restrictions: undefined,
  });
  const [error, setError] = useState<string>();
  const disabledFieldSet = new Set(disabledFields);

  const init = async () => {
    const { data } = await client
      .from('wedding_invitation_response')
      .select('*')
      .eq('guest_id', guestId);

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
        guest_id: guestId,
      });
      error = response.error;
    }

    if (error) {
      setError(error.message);
    } else {
      localStorage.setItem('rsvp', 'true');
      onSuccess?.(fields.response ?? 'no', !fields.id);
    }
  };

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const stampWidth = isMobile ? 48 : 100;
  const altStampWidth = isMobile ? 32 : 65;
  return (
    <>
      <Title>Dave & Ivy</Title>
      <MiniTitle>bid thy presence to their most joyous union</MiniTitle>

      <LocationContainer>
        <Image
          unoptimized
          src={Church.src}
          height={isMobile ? 48 : 64}
          width={isMobile ? 48 : 64}
          alt="church"
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Subtitle>The Cloisters Castle</Subtitle>
          <Substitle2>10440 Falls Rd, Timonium, MD 21093</Substitle2>
          <Date>November 9th, 2025 @ 4pm</Date>
        </Box>
      </LocationContainer>

      <RSVP>Thy response is humbly beseeched</RSVP>
      <RespondBy>
        Please respond by <span>9/1/2025</span>
      </RespondBy>

      <FirstQuestion>
        {(!disabledFieldSet.has('response') ||
          (disabledFieldSet.has('response') && fields.response === 'yes')) && (
          <ResponseItem
            onClick={() => setFields({ ...fields, response: 'yes' })}
            disabled={disabledFieldSet.has('response')}
          >
            {fields.response === 'yes' ? (
              <Image
                src={SealImage.src}
                alt="stamp"
                width={stampWidth}
                height={stampWidth}
                unoptimized
              />
            ) : (
              <ResponseItemPlaceholder />
            )}
            <Response>Verily!</Response> I am prepared to make merry!
          </ResponseItem>
        )}
        {(!disabledFieldSet.has('response') ||
          (disabledFieldSet.has('response') && fields.response === 'no')) && (
          <ResponseItem
            onClick={() => setFields({ ...fields, response: 'no' })}
            disabled={disabledFieldSet.has('response')}
          >
            {fields.response === 'no' ? (
              <Image
                src={SealImage.src}
                alt="stamp"
                width={stampWidth}
                height={stampWidth}
                unoptimized
              />
            ) : (
              <ResponseItemPlaceholder />
            )}
            <Response>No!</Response> My feline beast is aflame.
          </ResponseItem>
        )}
      </FirstQuestion>

      {!disabledFieldSet.has('plus_one') && (
        <ResponseItem
          onClick={() => setFields({ ...fields, plus_one: !fields.plus_one })}
          sx={{ marginBottom: theme.spacing(4) }}
        >
          {fields.plus_one ? (
            <Image
              src={SealImage.src}
              alt="stamp"
              width={altStampWidth}
              height={altStampWidth}
              unoptimized
            />
          ) : (
            <AltResponseItemPlaceholder />
          )}
          <SecondaryQuestion>
            <p>A companion (+1) will be joining me.</p>
            <span>
              Note: Due to the nature of the festivities, we request that
              children stay at home. We wish all guests to indulge in
              appropriate inebriation.
            </span>
          </SecondaryQuestion>
        </ResponseItem>
      )}

      <TertiaryQuestion>
        {!disabledFieldSet.has('plus_one') ? (
          <p>Do you or your plus one have any dietary restrictions?</p>
        ) : (
          <p>Do you have any dietary restrictions?</p>
        )}
        <span>
          A menu of what food will be provided is under <i>Sample Menu</i>{' '}
          {isMobile ? 'in the navigation below' : 'to your right'}. This menu is
          tentative and will be finalized closer to the date.
        </span>
        <Input
          type="text"
          placeholder="Enter any dietary restrictions"
          value={fields.food_restrictions}
          onChange={(e) =>
            setFields({ ...fields, food_restrictions: e.target.value })
          }
        />
      </TertiaryQuestion>

      {showWithUs && (
        <TertiaryQuestion sx={{ paddingTop: theme.spacing(4) }}>
          <p>For our far traveled guests, would you like to stay with us?</p>

          <ResponseItem onClick={() => setFields({ ...fields, hotel: 2 })}>
            {fields.hotel === 2 ? (
              <Image
                src={SealImage.src}
                alt="stamp"
                width={altStampWidth}
                height={altStampWidth}
                unoptimized
              />
            ) : (
              <AltResponseItemPlaceholder />
            )}
            <SecondaryQuestion>
              <p>Yes, I&apos;d like to stay with you!</p>
              <span>We'd love to host you while you're here. :)</span>
            </SecondaryQuestion>
          </ResponseItem>
        </TertiaryQuestion>
      )}

      {!disabledFieldSet.has('hotel') && (
        <TertiaryQuestion sx={{ paddingTop: theme.spacing(4) }}>
          <p>Would you like to book a hotel with the party?</p>

          <ResponseItem onClick={() => setFields({ ...fields, hotel: 1 })}>
            {fields.hotel === 1 ? (
              <Image
                src={SealImage.src}
                alt="stamp"
                width={altStampWidth}
                height={altStampWidth}
                unoptimized
              />
            ) : (
              <AltResponseItemPlaceholder />
            )}
            <SecondaryQuestion>
              <p>Yes, I&apos;ll book with the party!</p>
              <span>
                We are planning to book a block of rooms at a hotel and provide
                a shuttle back and forth from the hotel and venue. Hotel details
                coming soon.
              </span>
            </SecondaryQuestion>
          </ResponseItem>

          <ResponseItem onClick={() => setFields({ ...fields, hotel: 0 })}>
            {fields.hotel === 0 ? (
              <Image
                src={SealImage.src}
                alt="stamp"
                width={altStampWidth}
                height={altStampWidth}
                unoptimized
              />
            ) : (
              <AltResponseItemPlaceholder />
            )}
            <SecondaryQuestion>
              <p>No, I&apos;m good.</p>
              <span>
                I will be making my own arrangements or I live locally and am
                not planning to need a hotel.
              </span>
            </SecondaryQuestion>
          </ResponseItem>
        </TertiaryQuestion>
      )}

      <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      <ErrorMessage style={{ opacity: error ? 1 : 0 }}>
        Alas, an error occurred. Please try again or contact the Lord or Lady of
        the event.
      </ErrorMessage>
    </>
  );
};

export default Form;
