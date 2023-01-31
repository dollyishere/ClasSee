import React from 'react';
import ImageUpload from '../ImageUpload';

import { ImageUploadProps } from '../../types/CreateLessonType';

const StepTwo = ({ limitNumber, imgSrcList, setImgSrcList }: ImageUploadProps) => {
  return (
    <div>
      <h2>Step 2. 소개 사진 등록</h2>
      {/* props로 ImageUpload에 전달할 사진 개수를 limit 변수에 지정 */}
      <ImageUpload limitNumber={limitNumber} imgSrcList={imgSrcList} setImgSrcList={setImgSrcList} />
    </div>
  );
};

export default StepTwo;
