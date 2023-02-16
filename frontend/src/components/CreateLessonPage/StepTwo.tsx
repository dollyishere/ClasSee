import React from 'react';
import ImageUpload from '../ImageUpload';

import { ImageUploadProps } from '../../types/LessonsType';

const StepTwo = ({
  limitNumber,
  deleteImgList,
  setDeleteImgList,
  imgSrcListState,
  setImgSrcListState,
  imgFileListState,
  setImgFileListState,
}: ImageUploadProps) => {
  return (
    <div className="step">
      <div className="step__title">Step 2. 소개 사진 등록</div>
      {/* props로 ImageUpload에 전달할 사진 개수를 limit 변수에 지정 */}
      <ImageUpload
        deleteImgList={deleteImgList}
        setDeleteImgList={setDeleteImgList}
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
