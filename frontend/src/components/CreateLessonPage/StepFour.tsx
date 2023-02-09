import React from 'react';

import ImageUpload from '../ImageUpload';

import { ImageUploadProps, MaterialDescProps } from '../../types/LessonsType';

// 상의한 Props를 엮어서 CombinedProps라는 새로운 type를 생성함
type CombinedProps = ImageUploadProps & MaterialDescProps;

const StepFour = ({
  limitNumber,
  imgSrcListState,
  setImgSrcListState,
  imgFileListState,
  setImgFileListState,
  materialDescState,
  setMaterialDescState,
}: CombinedProps) => {
  // 해당하는 textarea의 값이 변화할 시, onChange와 setMaterialDescState을 이용해 materialDescState의 값을 변경함
  const handleInputMaterialDesc = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setMaterialDescState(e.target.value);
  };
  return (
    <div>
      <h2>Step 4. 준비물 등록</h2>
      {/* props로 ImageUpload에 전달할 사진 개수를 limit 변수에 지정 */}
      <ImageUpload
        limitNumber={limitNumber}
        imgSrcListState={imgSrcListState}
        setImgSrcListState={setImgSrcListState}
        imgFileListState={imgFileListState}
        setImgFileListState={setImgFileListState}
      />
      {/* 준비물에 대한 묘사를 작성하는 textarea */}
      <textarea
        cols={30}
        rows={10}
        placeholder="준비물에 대해 입력해주세요."
        value={materialDescState}
        onChange={handleInputMaterialDesc}
      />
    </div>
  );
};

export default StepFour;
