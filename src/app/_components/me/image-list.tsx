import { ImageList as MuiImageList, styled } from '@mui/material';
import { containerSizes, defaultInputPadding } from '@/common/constants';
import useIsMobile from '@/common/hooks/use-is-mobile';
import ImageItem from './image-item';
import BikeHelmet from '../../_assets/images/hobbies/bike_helmet.jpg';
import Car from '../../_assets/images/hobbies/car.jpg';
import Dogs from '../../_assets/images/hobbies/dogs.jpg';
import Gamer from '../../_assets/images/hobbies/gamer.jpg';
import Guitar from '../../_assets/images/hobbies/guitar.jpg';
import MuayThai from '../../_assets/images/hobbies/muaythai.jpg';
import Me2 from '../../_assets/images/hobbies/me_2.jpg';
import Me from '../../_assets/images/hobbies/me.jpg';

const List = styled(MuiImageList)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: containerSizes.mobile,
    paddingLeft: defaultInputPadding.large,
    paddingRight: defaultInputPadding.large,
  },
  width: '100%',
  paddingBottom: defaultInputPadding.large,
}));

const ImageList = () => {
  const isMobile = useIsMobile();
  const descriptions = {
    me2: 'There was a capybara in Japan! It demanded an offering.',
    bike: 'I can ride! This is my helmet and bike, a Ninja EX400.',
    dogs: 'This is Rogue and Brigand, our little outlaws.',
    muaythai: 'I trained in muay thai for about four years.',
    gamer:
      'I enjoy video games! This Overwatch character shares my same Korean name!',
    me: 'In case you are wondering, yes, the strawberry was delicious.',
    guitar: 'I self-taught myself some guitar. Guitar Hero started my interest',
    car: 'For some reason, I thought it was a good idea to start learning stick after getting my car.',
  };

  const mobileImages = [
    {
      rows: 2,
      cols: 4,
      img: Me2,
      description: descriptions.me2,
    },
    {
      rows: 2,
      cols: 2,
      img: BikeHelmet,
      description: descriptions.bike,
    },
    {
      rows: 2,
      cols: 2,
      description: descriptions.me,
      img: Me,
    },
    {
      rows: 2,
      cols: 4,
      img: Dogs,
      description: descriptions.dogs,
    },
    {
      rows: 2,
      cols: 4,
      img: MuayThai,
      description: descriptions.muaythai,
    },
    {
      rows: 2,
      cols: 4,
      img: Gamer,
      description: descriptions.gamer,
    },
    {
      rows: 2,
      cols: 4,
      img: Car,
      description: descriptions.car,
    },
  ];

  const desktopImages = [
    {
      rows: 4,
      cols: 4,
      img: Me2,
      description: descriptions.me2,
    },
    {
      rows: 4,
      cols: 2,
      img: BikeHelmet,
      description: descriptions.bike,
    },
    {
      rows: 2,
      cols: 2,
      img: Dogs,
      description: descriptions.dogs,
    },
    {
      rows: 2,
      cols: 2,
      img: MuayThai,
      description: descriptions.muaythai,
    },
    {
      rows: 2,
      cols: 2,
      img: Gamer,
      description: descriptions.gamer,
    },
    {
      rows: 4,
      cols: 2,
      img: Me,
      description: descriptions.me,
    },
    {
      rows: 4,
      cols: 4,
      img: Car,
      description: descriptions.car,
    },
    {
      rows: 2,
      cols: 2,
      img: Guitar,
      description: descriptions.guitar,
    },
  ];

  const images = isMobile ? mobileImages : desktopImages;
  return (
    <List variant="quilted" cols={isMobile ? 4 : 8} rowHeight={121} gap={8}>
      {images.map((image, i) => (
        <ImageItem key={i} item={image} />
      ))}
    </List>
  );
};

export default ImageList;
