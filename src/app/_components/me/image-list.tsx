import BikeHelmet from '../../assets/images/hobbies/bike_helmet.jpg';
import Car from '../../assets/images/hobbies/car.jpg';
import Dogs from '../../assets/images/hobbies/dogs.jpg';
import Gamer from '../../assets/images/hobbies/gamer.jpg';
import Guitar from '../../assets/images/hobbies/guitar.jpg';
import MuayThai from '../../assets/images/hobbies/muaythai.jpg';
import Me2 from '../../assets/images/hobbies/me_2.jpg';
import Me from '../../assets/images/hobbies/me.jpg';
import { ImageList as MuiImageList } from '@mui/material';
import useIsMobile from '@/app/_hooks/use-is-mobile';
import ImageItem from './image-item';

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
    <MuiImageList
      sx={{ width: isMobile ? 360 : '100%' }}
      variant="quilted"
      cols={isMobile ? 4 : 8}
      rowHeight={121}
      gap={8}
    >
      {images.map((image, i) => (
        <ImageItem key={i} item={image} />
      ))}
    </MuiImageList>
  );
};

export default ImageList;
