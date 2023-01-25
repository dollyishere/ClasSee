import React, { useRef, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Menu, { MenuProps } from '@mui/material/Menu';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Props {
  limit?: number;
}

const StepTwo = () => {
  const [showImages, setShowImages] = useState([]);
  // const [imageUrlLists, setimageUrlLists] = useState([]);

  // 이미지 상대경로 저장
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = e.target.files as FileList;
    let imageUrlLists = [...showImages] as string[];
    console.log(showImages);
    console.log(imageLists);
    console.log(imageLists.length);

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      console.log(currentImageUrl);
      imageUrlLists.push(currentImageUrl);
      console.log(imageUrlLists);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }
    console.log(imageUrlLists.type);
    setShowImages(imageUrlLists);
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id: number) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div>
      <h2>Step 2. 소개 사진 등록</h2>
      <div>
        <label htmlFor="input-file">
          <input hidden type="file" id="input-file" multiple onChange={handleAddImages} />
          <AddCircleOutlineIcon fill="#646F7C" />
        </label>
        {/* 저장해둔 이미지들을 순회하면서 화면에 이미지 출력 */}
        {/* {showImages.map((image: Blob, id: Number) => (
          <div key={id}>
            <img src={image} alt={`${image}-${id}`} />
            <RemoveCircleOutlineIcon onClick={() => handleDeleteImage(id)} />
          </div>
        ))} */}
      </div>
      <CardActions>
        <Link to="/open_lecture/1">
          <Button type="submit" variant="contained">
            이전 단계
          </Button>
        </Link>
        <Link to="/open_lecture/3">
          <Button type="submit" variant="contained">
            다음 단계
          </Button>
        </Link>
      </CardActions>
    </div>
  );
};

export default StepTwo;
