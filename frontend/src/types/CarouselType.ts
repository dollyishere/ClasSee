import { ListResult, StorageReference } from 'firebase/storage';

export interface CarouselProps {
  ads: ListResult | undefined;
}

export interface CarouselItemProps {
  imgRef: StorageReference;
}
