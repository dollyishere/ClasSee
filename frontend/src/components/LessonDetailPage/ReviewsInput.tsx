// import React, { useState } from 'react';
// import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
// import Reviews from './Reviews';
// import PrivateInfoState from '../../models/PrivateInfoAtom';

// const ReviewsInput = () => {
//   const [reviews, setReviews] = useState<
//     Array<{ username: string; rating: number; text: string }>
//   >([]);

//   const handleSubmit = (username: string, rating: number, text: string) => {
//     setReviews([...reviews, { username, rating, text }]);
//   };
//   const userInfo = useRecoilValue(PrivateInfoState);
//   return (
//     <div>
//       <Reviews
//         username={userInfo?.nickname}
//         rating={5}
//         onSubmit={handleSubmit}
//       />
//       {reviews.map((review) => (
//         <div key={review.username + review.text}>
//           <h3>{review.username}</h3>
//           <p>Rating: {review.rating}/5</p>
//           <p>{review.text}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ReviewsInput;

import React, { useState } from 'react';

interface Props {}

interface Review {
  rating: number;
  review: string;
}

const ReviewSystem: React.FC<Props> = () => {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(event.target.value));
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ rating, review });
    // You can dispatch the review data to your desired data store here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating:</label>
        <input
          type="radio"
          id="rating-1"
          name="rating"
          value="1"
          checked={rating === 1}
          onChange={handleRatingChange}
        />
        <label htmlFor="rating-1">1</label>
        <input
          type="radio"
          id="rating-2"
          name="rating"
          value="2"
          checked={rating === 2}
          onChange={handleRatingChange}
        />
        <label htmlFor="rating-2">2</label>
        {/* Add additional radio buttons for more rating options */}
      </div>
      <div>
        <label htmlFor="review">Review:</label>
        <textarea id="review" value={review} onChange={handleReviewChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewSystem;
