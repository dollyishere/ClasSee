import React, { useEffect, useState } from 'react';

const MyReviewsPage = () => {
  useEffect(() => {
    const myReviews = getMyReviews(email, limit, offset);
  });
  return (
    <div>
      <p>hi</p>
    </div>
  );
};
export default MyReviewsPage;
