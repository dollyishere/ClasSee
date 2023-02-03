import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const BasicRating = () => {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      {/* <Typography component="legend">Read only</Typography>
      <Rating name="read-only" value={value} readOnly />
      <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
      {value !== null && <Box sx={{ ml: 2 }}>{value}</Box>}
    </Box>
  );
};
export default BasicRating;
