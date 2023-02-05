import React, { useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import Reviews from './Reviews';
import PrivateInfoState from '../../models/PrivateInfoAtom';

const ReviewsInput = () => {
  const [reviews, setReviews] = useState<
    Array<{ username: string; rating: number; text: string }>
  >([]);

  const handleSubmit = (username: string, rating: number, text: string) => {
    setReviews([...reviews, { username, rating, text }]);
  };
  const userInfo = useRecoilValue(PrivateInfoState);
  return (
    <div>
      <Reviews
        username={userInfo?.nickname}
        rating={5}
        onSubmit={handleSubmit}
      />
      {reviews.map((review) => (
        <div key={review.username + review.text}>
          <h3>{review.username}</h3>
          <p>Rating: {review.rating}/5</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsInput;
