export interface StepOneProps {
  lessonNameState: string;
  setLessonNameState: React.Dispatch<React.SetStateAction<string>>;
  categorySelectState: string;
  setCategorySelectState: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepThreeProps {
  lessonDescState: string;
  setLessonDescState: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepFiveProps {
  curriListState: string[];
  setCurriListState: React.Dispatch<React.SetStateAction<string[]>>;
  maximumState: number;
  setMaximumState: React.Dispatch<React.SetStateAction<number>>;
  runningtimeState: number;
  setRunningtimeState: React.Dispatch<React.SetStateAction<number>>;
}

export interface StepSixProps {
  basicPriceState: number;
  setBasicPriceState: React.Dispatch<React.SetStateAction<number>>;
  kitPriceState: number;
  setKitPriceState: React.Dispatch<React.SetStateAction<number>>;
}

export interface ImageUploadProps {
  limitNumber: number;
  imgSrcListState: string[];
  setImgSrcListState: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface MaterialDescProps {
  materialDescState: string;
  setMaterialDescState: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoryProps {
  categorySelectState: string;
  setCategorySelectState: React.Dispatch<React.SetStateAction<string>>;
}
