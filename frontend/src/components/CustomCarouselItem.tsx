import React, { useEffect, useState } from 'react';
import useViewModel from '../viewmodels/AdViewModel';
import { CarouselItemProps } from '../types/CarouselType';

const CustomCarouselItem = ({ imgRef }: CarouselItemProps) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const { getAdImage } = useViewModel();
  useEffect(() => {
    const getData = async () => {
      const newImgSrc = await getAdImage(imgRef);
      setImgSrc(newImgSrc);
    };
    getData();
  }, []);
  return (
    <div className="carousel__item">
      <img src={imgSrc} alt="" />
    </div>
  );
};

export default CustomCarouselItem;
