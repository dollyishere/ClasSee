import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  categorySelect: string;
  setCategorySelect: React.Dispatch<React.SetStateAction<string>>;
}
const CategorySelectBox = ({ categorySelect, setCategorySelect }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setCategorySelect(event.target.value);
  };

  return (
    <Box sx={{ maxWidth: 200, maxHeight: 40 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categorySelect}
          label="category"
          onChange={handleChange}
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
