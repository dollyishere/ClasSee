import React, { useState } from 'react';
import BasicRating from '../BasicRating';

interface Props {
  username: string;
  score: number;
  onSubmit: (username: string, score: number, text: string) => void;
}

const Reviews: React.FC<Props> = ({ username, score, onSubmit }: Props) => {
  // const Reviews = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, score, text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{username}</h3>
      {/* <p>Rating: {rating}</p> */}
      {/* <BasicRating /> */}

      <input type="text" value={text} onChange={handleChange} />
      <button type="submit"> 등록 </button>
    </form>
  );
};

export default Reviews;
