import React, { useEffect, useState, useCallback } from 'react';

interface Props {
  myreview: {
    id: number;
    content: string;
    day: string;
    img: string;
    lessonId: number;
    lessonName: string;
    month: string;
    score: number;
    time: string;
    userEmail: string;
    userImg: number | null;
    userNickname: string;
    year: string;
  };
  // forceUpdate: () => void;
}
const MyReviewsItem: React.FC<Props> = ({ myreview }) => {
  return (
    <div className="my-reviewitem-page">
      <p>{myreview.id}</p>
    </div>
  );
};
export default MyReviewsItem;
