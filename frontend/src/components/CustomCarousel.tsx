import React from 'react';
import { StorageReference } from 'firebase/storage';
import Carousel from 'react-material-ui-carousel';
import CustomCarouselItem from './CustomCarouselItem';
import { CarouselProps } from '../types/CarouselType';

const CustomCarousel = ({ ads }: CarouselProps) => {
  return (
    <Carousel
      className="custom-carousel"
      autoPlay
      swipe
      animation="slide"
      cycleNavigation
      navButtonsAlwaysVisible
      indicators={false}
      height="450px"
    >
      {ads === undefined
        ? null
        : ads.items.map((ad: StorageReference) => (
            <CustomCarouselItem imgRef={ad} key={ad.name} />
          ))}
    </Carousel>
  );
};

export default CustomCarousel;
