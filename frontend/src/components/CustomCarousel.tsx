import React from 'react';
import { StorageReference } from 'firebase/storage';
import Carousel from 'react-material-ui-carousel';
import CustomCarouselItem from './CustomCarouselItem';

const CustomCarousel = ({ ads }: any) => {
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
            <CustomCarouselItem imgRef={ad} />
          ))}
    </Carousel>
  );
};

export default CustomCarousel;
