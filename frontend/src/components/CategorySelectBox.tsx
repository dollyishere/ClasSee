import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CategorySelectBox = () => {
  const [categorySelect, setCategorySelect] = useState('');

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
          <MenuItem value={1}>공예</MenuItem>
          <MenuItem value={2}>드로잉</MenuItem>
          <MenuItem value={3}>음악</MenuItem>
          <MenuItem value={4}>운동</MenuItem>
          <MenuItem value={5}>요리</MenuItem>
          <MenuItem value={6}>뷰티</MenuItem>
          <MenuItem value={99}>기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CategorySelectBox;
