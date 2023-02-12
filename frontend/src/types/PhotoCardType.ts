export interface CreatePhotoCardRequest {
  img: string;
  content: string;
  lessonId: number;
  sign: string;
  title: string;
  userEmail: string;
}

export interface PhotoCardType {
  id: number;
  content: string;
  img: string;
  isLiked: boolean;
  lessonName: string;
  likesCount: number;
  regDate: string;
  sign: string;
  title: string;
  userEmail: string;
  userNickname: string;
}

export interface PhotoCardProps {
  photoCard: PhotoCardType;
  back: boolean;
  handleDeletePhotoCard: (photoCard: PhotoCardType) => void;
}
