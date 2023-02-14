import React, { useEffect, useState } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import LessonCard from '../LessonCard';
import useViewModel from '../../viewmodels/MainPageViewModel';
import { LessonsResponse, Lesson } from '../../types/LessonsType';
import privateInfoState from '../../models/PrivateInfoAtom';
import Nolesson from './NoLesson';

// 로그인이 되었을 때만 이 컴포넌트가 보여짐
// 내가 개설한 강의를 get으로 api요청 보냄
// 강의가 있으면 강의카드를 보여주고
// 강의가 없다면(빈 배열이라면) 없음을 보여줌
const MyCreatedLessonsMainpage = () => {
  const message = '개설';

  // 내가 개설한 강의 2개 가져오는 함수
  const { getMyCreatedLessonsMainpage } = useViewModel();
  const [lessons, setLessons] = useState<Lesson[]>();
  const userInfo = useRecoilValue(privateInfoState);

  // 메인페이지 마운트 시 강의 정보들 요청
  useEffect(() => {
    if (userInfo) {
      getMyCreatedLessonsMainpage(userInfo.email, 2, 0).then(
        (response: LessonsResponse) => {
          console.log('내가 개설한 강의', response.lessonInfoList.length);
          if (response.lessonInfoList.length === 0) {
            setLessons(undefined);
          } else {
            setLessons(response.lessonInfoList);
          }
        },
      );
    }
  }, []);

  return (
    <div className="createlessons">
      <h1 className="createlessons__title"> 개설한 클래스 </h1>
      <div className="createlessons__cards">
        {lessons ? (
          lessons.map((lesson: Lesson) => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
          ))
        ) : (
          <Nolesson message={message} />
        )}
      </div>
    </div>
  );
};

export default MyCreatedLessonsMainpage;
