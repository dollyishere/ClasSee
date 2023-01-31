import React, { useState, useRef, useMemo, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/_create-lesson-page.scss';

import { Button, Card, CardActions } from '@mui/material';

import StepOne from '../components/create-lesson-steps/StepOne';
import StepTwo from '../components/create-lesson-steps/StepTwo';
import StepThree from '../components/create-lesson-steps/StepThree';
import StepFour from '../components/create-lesson-steps/StepFour';
import StepFive from '../components/create-lesson-steps/StepFive';
import StepSix from '../components/create-lesson-steps/StepSix';

const CreateLessonPage = () => {
  // component 전환의 기준이 되는 selectedComponent를 useState로 생성(기본값 1)
  const [selectedComponent, setSelectedComponent] = useState(1);
  // Step1의 강의명, 카테고리 선택값을 담기 위한 lessonName, categorySelect 각각 생성
  const [lessonName, setLessonName] = useState<string>('');
  const [categorySelect, setCategorySelect] = useState<string>('');
  // Step2의 강의 사진을 담기 위한 lessonImgList 생성
  const [lessonImgList, setLessonImgList] = useState<string[]>([]);
  // Step3의 강의 상세 설명을 담기 위한 lessonDescription 생성
  const [lessonDescription, setlessonDescription] = useState<string>('');
  // Step4의 준비물 사진, 묘사를 담기 위한 materialImgList, materialDescription 생성
  const [materialImgList, setMaterialImgList] = useState<string[]>([]);
  const [materialDescription, setMaterialDescription] = useState<string>('');
  // Step5의 커리큘럼 목록, 최대 참여 인원 수, 예상 최대 강의 시간을 담기 위한 curriculumList, maximum, runningtime 생성
  const [curriculumList, setCurriculumList] = useState<string[]>([]);
  const [maximum, setMaximum] = useState<number>(0);
  const [runningtime, setRunningtime] = useState<number>(0);
  // Step6의 기본 요금, 옵션 추가 시 요금을 담기 위한 basicPrice, kitPrice 생성
  const [basicPrice, setBasicPrice] = useState<number>(0);
  const [kitPrice, setKitPrice] = useState<number>(0);

  return (
    <div className="container">
      {/* 페이지 제목 지정 */}
      <h1>강의 간편 개설하기</h1>
      {/* 카드로 form이 들어갈 영역 지정 */}
      {/* selectedComponent 값이 변환될 시, 해당하는 컴포넌트를 리렌더링함 */}
      {/* 해당하는 component에 필요한 props를 상속시켜줌 */}
      <Card sx={{ minWidth: 275 }}>
        {selectedComponent === 1 && (
          <StepOne
            lessonName={lessonName}
            setLessonName={setLessonName}
            categorySelect={categorySelect}
            setCategorySelect={setCategorySelect}
          />
        )}
        {selectedComponent === 2 && (
          <StepTwo limitNumber={5} imgSrcList={lessonImgList} setImgSrcList={setLessonImgList} />
        )}
        {selectedComponent === 3 && (
          <StepThree lessonDescription={lessonDescription} setLessonDescription={setlessonDescription} />
        )}
        {selectedComponent === 4 && (
          <StepFour
            limitNumber={10}
            imgSrcList={materialImgList}
            setImgSrcList={setMaterialImgList}
            materialDescription={materialDescription}
            setMaterialDescription={setMaterialDescription}
          />
        )}
        {selectedComponent === 5 && (
          <StepFive
            curriculumList={curriculumList}
            setCurriculumList={setCurriculumList}
            maximum={maximum}
            setMaximum={setMaximum}
            runningtime={runningtime}
            setRunningtime={setRunningtime}
          />
        )}
        {selectedComponent === 6 && (
          <StepSix
            basicPrice={basicPrice}
            setBasicPrice={setBasicPrice}
            kitPrice={kitPrice}
            setKitPrice={setKitPrice}
          />
        )}
        <CardActions>
          {selectedComponent === 1 ? null : (
            <Button type="button" variant="contained" onClick={() => setSelectedComponent(selectedComponent - 1)}>
              이전 단계
            </Button>
          )}
          {selectedComponent === 6 ? (
            <Button type="submit" variant="contained">
              제출
            </Button>
          ) : (
            <Button type="button" variant="contained" onClick={() => setSelectedComponent(selectedComponent + 1)}>
              다음 단계
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
export default CreateLessonPage;
