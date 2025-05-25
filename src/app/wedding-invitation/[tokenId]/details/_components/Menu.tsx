import { jacquard24, pixelify } from '@/app/wedding-invitation/_fonts';
import theme from '@/common/theme';
import { styled, useMediaQuery } from '@mui/material';

import BaconDish from '../../../_assets/menu/14_bacon_dish.png';
import FruitCake from '../../../_assets/menu/47_fruitcake_dish.png';
import MacNCheese from '../../../_assets/menu/68_macncheese_dish.png';
import SteakDish from '../../../_assets/menu/96_steak_dish.png';
import Beer from '../../../_assets/menu/fb504.png';

const Title = styled('h2')(({ theme }) => ({
  fontSize: 128,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 64,
  },
}));

const Description = styled('p')(({ theme }) => ({
  fontSize: 18,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: 11,
  },
}));

const TwoColumnContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
  },
}));

const Header = styled('h3')(({ theme }) => ({
  fontSize: 64,
  fontFamily: jacquard24.style.fontFamily,
  fontWeight: 400,
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
  '& img': {
    imageRendering: 'pixelated',
    marginLeft: theme.spacing(1),
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 32,
  },
}));

const HeaderWithSpacing = styled(Header)(({ theme }) => ({
  marginTop: theme.spacing(8),
  [theme.breakpoints.down('md')]: {
    marginTop: theme.spacing(4),
  },
}));

const ColumnDescription = styled('p')(({ theme }) => ({
  fontSize: 14,
  fontFamily: pixelify.style.fontFamily,
  fontWeight: 400,
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    fontSize: 12,
  },
}));

const MenuItem = styled('div')(({ theme }) => ({
  '& > p': {
    fontSize: 36,
    fontFamily: jacquard24.style.fontFamily,
    fontWeight: 400,
  },
  '& > span': {
    display: 'inline-block',
    fontSize: 18,
    fontFamily: pixelify.style.fontFamily,
    fontWeight: 400,
    transform: 'translateY(-4px)',
    paddingLeft: theme.spacing(4),
    maxWidth: 600,
  },
  '& + div': {
    marginTop: theme.spacing(4),
  },
  [theme.breakpoints.down('md')]: {
    '& > p': {
      fontSize: 24,
    },
    '& + div': {
      marginTop: theme.spacing(2),
    },
    '& > span': {
      fontSize: 12,
      paddingLeft: theme.spacing(2),
    },
  },
}));

const LargeSampleImage = styled('img')(({ theme }) => ({
  imageRendering: 'pixelated',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    justifySelf: 'center',
  },
}));

const RelativeContainer = styled('div')({
  position: 'relative',
});

const RightAlignedImage = styled(LargeSampleImage)({
  position: 'absolute',
  right: 0,
  top: '50%',
  transform: 'translateY(-50%)',
});

const Menu = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });
  const iconSize = isMobile ? 32 : 64;
  return (
    <>
      <Title>Sample Menu</Title>
      <Description>
        Note: This is a tentative menu and will be finalized closer to the date.
      </Description>

      <HeaderWithSpacing>
        Cocktail Hour
        <img
          src={BaconDish.src}
          alt="Bacon Dish"
          height={iconSize}
          width={iconSize}
        />
      </HeaderWithSpacing>
      <TwoColumnContainer>
        <div>
          <ColumnDescription>
            Staggered opening but everything will be available at the same time
            and during the duration of the event until cleanup. Hors
            d&apos;oeuvres will be deliverable by tray or available at a
            station.
          </ColumnDescription>

          <MenuItem>
            <p>Domestic Cheese Board</p>
            <span>with grapes & strawberries</span>
          </MenuItem>

          <MenuItem>
            <p>Dip Trio</p>
            <span>
              kalamata olive tapenade; tomato & basil bruschetta; roasted red
              pepper hummus; offered with garlic pita crisps
            </span>
          </MenuItem>

          <MenuItem>
            <p>Tuna Poke</p>
            <span>
              artfully presented on an asian spoon, wakimi, black and white
              sesame seeds
            </span>
          </MenuItem>

          <LargeSampleImage
            src={SteakDish.src}
            alt="Steak Dish"
            height={isMobile ? 100 : 200}
            width={isMobile ? 100 : 200}
          />
        </div>
        <div>
          <MenuItem>
            <p>Korean Beef Short Rib Slider</p>
            <span>picked red onions, hawaiian roll</span>
          </MenuItem>

          <MenuItem>
            <p>Roasted Vegetables</p>
            <span>
              an array of vegetables tossed with sea salt, herb, and EVOO;
              roasted to intensity flavor then drizzled with an aged balsamic
              syrup
            </span>
          </MenuItem>

          <MenuItem>
            <p>Butternut Squah Gran Queso Empanadas</p>
            <span>acovado creme drizzle</span>
          </MenuItem>
          <MenuItem>
            <p>Heirloom Tomato Soup & Grill Cheese Panini Duo</p>
            <span>
              a tasty hot shot complimented by a toasty grilled cheese panini
              with boursin, cheddar, and gruyere cheeses
            </span>
          </MenuItem>
        </div>
      </TwoColumnContainer>

      {isMobile ? (
        <HeaderWithSpacing>Main Buffet</HeaderWithSpacing>
      ) : (
        <Header>Main Buffet</Header>
      )}
      <MenuItem>
        <p>Chef Carved Top Round of Beed</p>
        <span>
          rolled in fresh rosemary, garlic & black pepper; offered with bacon
          onion jam, whole grain mustard & horseradish cream sauce
        </span>
      </MenuItem>
      <MenuItem>
        <p>Chesapeake Bay Salad</p>
        <span>
          mixed greens, old bay crusted pecans, roasted corn, vine ripe
          tomatoes, parmesan cheese, smoky tomato vinaigrette
        </span>
      </MenuItem>
      <MenuItem>
        <p>Grilled Bourbon Chicken</p>
        <span>apple cider demi-glace, topped with a savory apple relish</span>
      </MenuItem>

      <RelativeContainer>
        <RightAlignedImage
          src={MacNCheese.src}
          alt="Mac & Cheese"
          height={isMobile ? 85 : 225}
          width={isMobile ? 85 : 225}
        />
        <HeaderWithSpacing>Side Dishes</HeaderWithSpacing>
        <MenuItem>
          <p>Garlic Mashed Potatoes</p>
          <span>you know what mash potatoes are, silly</span>
        </MenuItem>
        <MenuItem>
          <p>Long Grain Wild Rice</p>
          <span>accented with toasted almonds & sundried cranberries</span>
        </MenuItem>
        <MenuItem>
          <p>Gourmet Bread Basket</p>
          <span>
            assorted bistro rolls, rosemary breadsticks, focaccia wedges, sweet
            creamy butter
          </span>
        </MenuItem>
      </RelativeContainer>

      <HeaderWithSpacing>
        Dessert
        <img
          src={FruitCake.src}
          alt="Fruit Cake"
          height={iconSize}
          width={iconSize}
        />
      </HeaderWithSpacing>
      <MenuItem>
        <p>Tray Passed Sweet Treats</p>
        <span>
          a chef&apos;s selection of homemade sweets, may include: assorted
          fancy finger dessert bars, cake truffles, mini cannoli&apos;s, mini
          fruit tarts
        </span>
      </MenuItem>

      <HeaderWithSpacing>
        Beverages
        <img src={Beer.src} alt="Beer" height={iconSize} width={iconSize} />
      </HeaderWithSpacing>
      <TwoColumnContainer>
        <div>
          <MenuItem>
            <p>Full Bar</p>
            <span>
              a full bar service will be available for the duration of the
              event. but expect a lot of mead. hint hint, wink wink.
            </span>
          </MenuItem>
        </div>
        <div>
          <MenuItem>
            <p>Non-Alcoholic Beverages</p>
            <span>
              still & sparkling water, club soda, tonic water, juices, regular &
              non-diet sodas
            </span>
          </MenuItem>
        </div>
      </TwoColumnContainer>
    </>
  );
};

export default Menu;
