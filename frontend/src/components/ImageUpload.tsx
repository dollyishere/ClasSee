import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../utils/Firebase';

// 부모 컴포넌트 측에서 전달한 Props의 type을 지정함
import { ImageUploadProps } from '../types/LessonsType';

const ImageUpload = ({
  limitNumber,
  deleteImgList,
  setDeleteImgList,
  imgSrcListState,
  setImgSrcListState,
  imgFileListState,
  setImgFileListState,
}: ImageUploadProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  // 만약 사용자가 이미지를 input을 통해 추가했을 시, 이하 함수 실행
  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자가 올린 파일 정보를 변수 img에 저장
    const img = e.target.files?.[0];

    // imageCompression을 통해 압축될 이미지 규격을 정함
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
    };

    // 만약 img 값이 null이 아니라면, 이하 과정을 거침
    if (img) {
      // compressedFile에 imageCompression에 요청을 보내 압축된 파일 정보를 받아옴
      const compressedFile = await imageCompression(img, options);
      // FormData를 통해, 파일 내용을 인코딩함
      // FormData를 사용하는 이유는, 페이지 전환 없이 폼 데이터를 제출하기 위함임
      const formData = new FormData();
      formData.append('image', compressedFile);

      // FileReader()를 이용해 파일 정보를 비동기적으로 읽어옴
      const fileReader = new FileReader();
      // compressedfile을 fileReader를 통해 로컬 내 주소를 불러옴
      // 해당 주소를 통해 미리보기 기능을 지원 가능함
      fileReader.readAsDataURL(compressedFile);
      setImgFileListState([...imgFileListState, compressedFile]);
      // URL.createObjectURL을 통해 해당 파일의 상대경로를 생성, imgSrcListState에 저장함
      const result = URL.createObjectURL(compressedFile);
      setImgSrcListState([...imgSrcListState, result]);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // 마이너스 버튼 클릭 시, 해당하는 이미지는 삭제됨
  const handleDeleteImage = async (id: number) => {
    const deletedImg = imgFileListState.filter(
      (_, index) => index === id,
    )[0] as any;
    if (!(deletedImg instanceof Blob)) {
      setDeleteImgList([...deleteImgList, deletedImg]);
      alert('사진이 삭제되었습니다!');
    }
    setImgSrcListState(imgSrcListState.filter((_, index) => index !== id));
    setImgFileListState(imgFileListState.filter((_, index) => index !== id));
  };

  return (
    <div className="img-upload">
      {imgSrcListState.length === 0 ? (
        <h3>사진을 업로드 해보세요!</h3>
      ) : (
        <h3>
          {imgSrcListState.length} / {limitNumber}
        </h3>
      )}

      <div className="img__container">
        {/* 저장해둔 이미지들을 map을 통해 순회하면서 화면에 이미지 출력 */}
        {imgSrcListState.map((image: string, id: number) => (
          <div className={image}>
            <img className="img__item" src={image} alt={`${image}-${id}`} />
            <RemoveCircleOutlineIcon
              className="img__delete"
              onClick={() => handleDeleteImage(id)}
            />
          </div>
        ))}
        {/* 만약 imgFileListState의 길이가 limitNumber에서 지정된 값 이상이라면, 더 이상 이미지를 추가할 수 없도록 버튼을 숨김 */}
        {imgSrcListState.length < limitNumber ? (
          <label htmlFor="input-file" className="img-upload__label">
            <input
              hidden
              type="file"
              id="input-file"
              ref={fileRef}
              multiple
              onChange={handleAddImages}
            />
            <AddCircleOutlineIcon fill="#646F7C" className="img-upload__btn" />
          </label>
        ) : null}
      </div>
    </div>
  );
};

export default ImageUpload;
