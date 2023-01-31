import React from 'react';

import { Box, InputLabel, MenuItem, FormControl, Select, SelectChangeEvent } from '@mui/material';

import { CategoryProps } from '../types/CreateLessonType';

const CategorySelectBox = ({ categorySelect, setCategorySelect }: CategoryProps) => {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategorySelect(event.target.value);
  };

  return (
    // 각 MenuItem value에 해당하는 강의명을 배정함
    // 이후 선택한 값이 바뀔 시(Select), onChange로 handleCategoryChange 함수를 실행시킴
    // 이를 통해 categorySelect 값을 해당 event.target.value로 변경해줌
    <Box sx={{ maxWidth: 200, maxHeight: 40 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categorySelect}
          label="category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="공예">공예</MenuItem>
          <MenuItem value="드로잉">드로잉</MenuItem>
          <MenuItem value="음악">음악</MenuItem>
          <MenuItem value="운동">운동</MenuItem>
          <MenuItem value="요리">요리</MenuItem>
          <MenuItem value="뷰티">뷰티</MenuItem>
          <MenuItem value="기타">기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelectBox;
