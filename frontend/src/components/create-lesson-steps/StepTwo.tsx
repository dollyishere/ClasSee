import React from 'react';
import ImageUpload from '../ImageUpload';

import { ImageUploadProps } from '../../types/CreateLessonType';

const StepTwo = ({
  limitNumber,
  imgSrcListState,
  setImgSrcListState,
  imgFileListState,
  setImgFileListState,
}: ImageUploadProps) => {
  return (
    <div>
      <h2>Step 2. 소개 사진 등록</h2>
      {/* props로 ImageUpload에 전달할 사진 개수를 limit 변수에 지정 */}
      <ImageUpload
        imgSrcListState={imgSrcListState}
        setImgSrcListState={setImgSrcListState}
        limitNumber={limitNumber}
        imgFileListState={imgFileListState}
        setImgFileListState={setImgFileListState}
      />
    </div>
  );
};

export default StepTwo;
