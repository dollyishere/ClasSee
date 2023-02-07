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
  kitDescState: string;
  setKitDescState: React.Dispatch<React.SetStateAction<string>>;
  kitPriceState: number;
  setKitPriceState: React.Dispatch<React.SetStateAction<number>>;
}

export interface ImageUploadProps {
  limitNumber: number;
  imgSrcListState: string[];
  setImgSrcListState: React.Dispatch<React.SetStateAction<string[]>>;
  imgFileListState: object[];
  setImgFileListState: React.Dispatch<React.SetStateAction<object[]>>;
}

export interface MaterialDescProps {
  materialDescState: string;
  setMaterialDescState: React.Dispatch<React.SetStateAction<string>>;
}

export interface CategoryProps {
  categorySelectState: string;
  setCategorySelectState: React.Dispatch<React.SetStateAction<string>>;
}

export interface ChangeComponentProps {
  selectedComponentState: number;
  setSelectedComponentState: React.Dispatch<React.SetStateAction<number>>;
  handleCreateLessonSubmit: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

export interface CheckListType {
  img: string;
}

export interface CurriculumType {
  stage: number;
  description: string;
}

export interface PamphletType {
  img: string;
}

export interface LessonRequest {
  category: string;
  checkList: CheckListType[];
  cklsDescription: string;
  curriculumList: CurriculumType[];
  description: string;
  email: string | undefined;
  kitDescription: string;
  kitPrice: number;
  maximum: number;
  name: string;
  pamphletList: PamphletType[];
  price: number;
  runningtime: number;
}

export interface CreateLessonResponse {
  message: string;
  statusCode: number;
  lessonId: number;
}
