import React, { useRef, useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';
import { useRecoilValue } from 'recoil';
import { useLocation, useParams } from 'react-router-dom';

import useViewModel from '../viewmodels/CreatePhotoCardViewModel';
import PrivateInfoState from '../models/PrivateInfoAtom';

const CreatePhotoCardPage = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [image, setImage] = useState<File>();
  const [imageSrc, setImageSrc] = useState<string>();

  const params = useParams();
  const { email, openLessonId, lessonId } = params;

  const { createPhotoCard } = useViewModel();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files !== null) {
      // FileReader()를 이용해 파일 정보를 비동기적으로 읽어옴
      const result = URL.createObjectURL(event.currentTarget.files[0]);
      setImageSrc(result);
      setImage(event.currentTarget.files[0]);
    }
  };
  const handleSubmitPhotoCard = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (titleRef.current !== null && contentRef.current !== null) {
      const titleTarget = titleRef.current as HTMLInputElement;
      const contentTarget = contentRef.current as HTMLTextAreaElement;

      if (titleTarget.value === '') {
        alert('제목을 입력해주세요.');
        return;
      }
      if (contentTarget.value === '') {
        alert('글귀를 입력해주세요.');
        return;
      }
      if (image === undefined) {
        alert('사진을 업로드해주세요.');
        return;
      }
      if (
        imageSrc !== undefined &&
        email !== undefined &&
        lessonId !== undefined &&
        openLessonId
      ) {
        const response = await createPhotoCard(
          {
            userEmail: email,
            img: `photo-cards/${encodeURI(email)}/${encodeURI(
              String(2),
            )}/${encodeURI('test')}/${image.name}`,
            title: titleTarget.value,
            content: contentTarget.value,
            sign: '',
            lessonId: Number(lessonId),
            openLessonId: Number(openLessonId),
          },
          image,
          openLessonId,
        );

        if (response === 200) {
          alert('생성되었습니다.');
          window.close();
        }
      }
    }
  };
  return (
    <div className="create-photo-card-page page">
      <div className="create-photo-card-page__frame">
        <div className="create-photo-card-page__contents">
          <form
            onSubmit={handleSubmitPhotoCard}
            className="create-photo-card-page__form"
          >
            <div className="create-photo-card-page__row">
              <input
                type="text"
                ref={titleRef}
                className="create-photo-card-page__title"
                placeholder="제목 입력..."
              />
            </div>
            <div className="create-photo-card-page__row">
              <label
                htmlFor="create-photo-card-page__input-photo"
                className="create-photo-card-page__input-photo"
              >
                {image === undefined ? (
                  <AddCircleOutline className="create-photo-card-page__icon--add" />
                ) : (
                  <img src={imageSrc} alt="사진" />
                )}
                <input
                  onChange={handleImageUpload}
                  hidden
                  type="file"
                  id="create-photo-card-page__input-photo"
                />
              </label>
              사진 선택
            </div>
            <div className="create-photo-card-page__row">
              <textarea ref={contentRef} placeholder="글귀 입력..." />
            </div>
            <button
              type="submit"
              className="button create-photo-card-page__button"
            >
              발행
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePhotoCardPage;
