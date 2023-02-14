import React from 'react';
import Carousel from 'react-material-ui-carousel';

const CustomCarousel = () => {
  const sample = [
    {
      name: '샘플 1',
      description: '샘플 1 설명',
    },
    {
      name: '샘플 2',
      description: '샘플 2 설명',
    },
  ];
  return (
    <Carousel
      autoPlay
      swipe
      animation="slide"
      cycleNavigation
      navButtonsAlwaysVisible
      indicators={false}
      height="450px"
    >
      {sample.map((item: any, i: number) => {
        return (
          <div className="carousel__item">
            <h2>{item.name}</h2>
            <p>{i}</p>
            <p>{item.description}</p>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CustomCarousel;
