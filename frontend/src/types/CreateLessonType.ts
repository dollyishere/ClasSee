export interface StepOneProps {
  lessonName: string;
  setLessonName: React.Dispatch<React.SetStateAction<string>>;
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepThreeProps {
  lessonDescription: string;
  setLessonDescription: React.Dispatch<React.SetStateAction<string>>;
}

export interface StepFiveProps {
  curriculumList: string[];
  setCurriculumList: React.Dispatch<React.SetStateAction<string[]>>;
  maximum: number;
  setMaximum: React.Dispatch<React.SetStateAction<number>>;
  runningtime: number;
  setRunningtime: React.Dispatch<React.SetStateAction<number>>;
}

export interface StepSixProps {
  basicPrice: number;
  setBasicPrice: React.Dispatch<React.SetStateAction<number>>;
  kitPrice: number;
  setKitPrice: React.Dispatch<React.SetStateAction<number>>;
}

export interface ImageUploadProps {
  limitNumber: number;
  imgSrcList: string[];
  setImgSrcList: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface MaterialDescriptionProps {
  materialDescription: string;
  setMaterialDescription: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoryProps {
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
}
