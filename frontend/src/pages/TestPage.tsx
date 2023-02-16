import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../utils/Firebase';

const TestPage = () => {
  // firebase에 올리기 전업로드한 이미지를  임시로 저장할 state
  const [image, setImage] = useState<any>(null);
  // firebase에서 가져온 이미지들을 저장할 state
  const [imageList, setImageList] = useState<any>([]);

  // firebase storage의 이 경로에 있는 파일들을 가져옴
  const imageRef = ref(storage, 'profiles/images/');

  // 전송 버튼 클릭시
  const uploadImage = async (e: any) => {
    // 새로고침 방지
    e.preventDefault();
    // 선택한 이미지 파일이 없으면 리턴
    if (image === null) return;

    // storage의 profiles/images/이미지이름 경로에 이미지 업로드
    const uploadedImage = await uploadBytes(
      ref(storage, `profiles/images/${image.name}`),
      image,
    );
  };

  // 마운트시 imageRef에 있는 storage 경로에서 이미지를 다운로드
  useEffect(() => {
    listAll(imageRef).then((response: any) => {
      response.items.forEach((item: any) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev: any) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div>
      <form onSubmit={uploadImage}>
        <input
          type="file"
          placeholder="사진추가"
          onChange={(event: any) => {
            setImage(event.target.files[0]);
          }}
        />
        <input type="submit" value="전송" />
      </form>
      {imageList.map((el: any) => (
        <img key={el} src={el} alt={el} />
      ))}
    </div>
  );
};

export default TestPage;
