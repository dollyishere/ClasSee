import React, { useState } from 'react';

interface Props {
  username: string;
  rating: number;
  onSubmit: (username: string, rating: number, text: string) => void;
}

const Reviews: React.FC<Props> = ({ username, rating, onSubmit }: Props) => {
  // const Reviews = () => {
  const [text, setText] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, rating, text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{username}</h3>
      <p>Rating: {rating}/5</p>
      <p>{text}</p>
      <input type="text" value={text} onChange={handleChange} />
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default Reviews;
