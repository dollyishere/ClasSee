import { AddCircleOutline } from '@mui/icons-material';
import React, { useRef } from 'react';

const CreatePhotoCardPage = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const handleSubmitPhotoCard = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
                <AddCircleOutline className="create-photo-card-page__icon--add" />
                <input
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
