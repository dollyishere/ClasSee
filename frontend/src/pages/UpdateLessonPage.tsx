import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Button, Card, CardActions } from '@mui/material';

import { ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../utils/Firebase';

import PrivateInfoState from '../models/PrivateInfoAtom';

import StepOne from '../components/CreateLessonPage/StepOne';
import StepTwo from '../components/CreateLessonPage/StepTwo';
import StepThree from '../components/CreateLessonPage/StepThree';
import StepFour from '../components/CreateLessonPage/StepFour';
import StepFive from '../components/CreateLessonPage/StepFive';
import StepSix from '../components/CreateLessonPage/StepSix';
import Header from '../components/Header';

import CreateLessonViewModel from '../viewmodels/CreateLessonViewModel';
import LessonDetailViewModel from '../viewmodels/LessonDetailViewModel';

import {
  ImageType,
  CurriculumType,
  LessonRequest,
  ImageListType,
  LessonDetailRequest,
  LessonDetailResponse,
  CurriculumsType,
} from '../types/LessonsType';

const UpdateLessonPage = () => {
  // url(Router) 통해서 입력된 lessonId를 useParams로 받아옴
  const lessonId = useParams();

  // component 전환의 기준이 되는 selectedComponent를 useState로 생성(기본값 1)
  const [selectedComponent, setSelectedComponent] = useState(1);

  // Step1의 강의명, 카테고리 선택값을 담기 위한 lessonName, categorySelect 각각 생성
  const [lessonNameState, setLessonNameState] = useState<string>('');
  const [categorySelectState, setCategorySelectState] = useState<string>('');
  // Step2의 강의 사진을 담기 위한 lessonImgListState 생성
  const [lessonImgSrcListState, setLessonImgSrcListState] = useState<string[]>(
    [],
  );
  const [lessonImgFileListState, setLessonImgFileListState] = useState<
    object[]
  >([]);

  // Step3의 강의 상세 설명을 담기 위한 lessonDescState 생성
  const [lessonDescState, setlessonDescState] = useState<string>('');
  // Step4의 준비물 사진, 묘사를 담기 위한 materialImgSrcListState, materialDescState 생성
  const [materialImgSrcListState, setMaterialImgSrcListState] = useState<
    string[]
  >([]);
  const [materialImgFileListState, setMaterialImgFileListState] = useState<
    object[]
  >([]);
  const [materialDescState, setMaterialDescState] = useState<string>('');
  // Step5의 커리큘럼 목록, 최대 참여 인원 수, 예상 최대 강의 시간을 담기 위한 curriListState, maximumState, runningtimeState 생성
  const [curriListState, setCurriListState] = useState<string[]>([]);
  const [maximumState, setMaximumState] = useState<number>(0);
  const [runningtimeState, setRunningtimeState] = useState<number>(0);
  // Step6의 기본 요금, 옵션 추가 시 설명과 요금을 담기 위한 basicPriceState, kitDescState, kitPriceState 생성
  const [basicPriceState, setBasicPriceState] = useState<number>(0);
  const [kitDescState, setKitDescState] = useState<string>('');
  const [kitPriceState, setKitPriceState] = useState<number>(0);

  const [deleteImgList, setDeleteImgList] = useState<any[]>([]);

  // api 실행할 시 실행될 함수를 불러옴
  const { updateLesson } = CreateLessonViewModel();

  // 강의 개설 완료 시 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  // api 실행할 시 실행될 CreateLessonViewModel createLesson에 할당
  const {
    getLessonDetail,
    getPamphletImgUrls,
    getCheckImgUrls,
    getPamphletImgFiles,
    getCheckImgFiles,
    doUploadImage,
    doDeleteImageFiles,
  } = LessonDetailViewModel();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(PrivateInfoState);

  // firebase storage의 이 경로에 있는 파일들을 가져옴

  const checkListImgRef = ref(
    storage,
    `lessons/${lessonId.lessonId}/checklist_images`,
  );
  const pamphletsImgRef = ref(
    storage,
    `lessons/${lessonId.lessonId}/pamphlet_images/`,
  );

  // const handleLessonDelete = (event: React.MouseEvent<HTMLButtonElement>) => {};
  // useEffect로 해당 페이지 렌더링 시 강의 상세 정보를 받아오도록 내부 함수 실행
  useEffect(() => {
    if (userInfo === null) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
    } else {
      const getLessonDetailRequestBody: LessonDetailRequest = {
        email: userInfo.email,
        lessonId: Number(lessonId.lessonId),
      };
      const fetchData = async () => {
        const res = await getLessonDetail(getLessonDetailRequestBody);
        if (res?.message === 'SUCCESS') {
          // 만약 강의 상세 정보를 db에서 받아오는 것에 성공했다면, 해당하는 State에 각각 정보를 저장
          // 또한, 각 State에 정보를 전달하기 전에 현재 강의 수정을 시도하는 유저와, 강의를 생성한 유저의 이메일을 대조해봄
          // 시도하는 유저와 강의 생성 유저가 같다면, 그 이후부터 정보를 배분함
          // 만약 강의 수정을 시도하는 유저가 해당 강의를 개설하지 않았다면, 경고창을 띄운 후 메인페이지로 돌아가게 함
          if (userInfo.email !== res.teacher) {
            alert('잘못된 접근입니다.');
            navigate('/');
          } else {
            setLessonNameState(res.lessonName);
            setCategorySelectState(res.category);
            setlessonDescState(res.lessonDescription);
            setMaterialDescState(res.cklsDescription);
            setMaximumState(res.maximum);
            setRunningtimeState(res.runningTime);
            setBasicPriceState(res.kitPrice);
            setKitDescState(res.kitDescription);
            setKitPriceState(res.kitPrice);

            // curriculums, pamphlets, checkList의 경우, 리스트 형태이므로 forEach로 해체하여 따로 저장
            res.curriculums.forEach((item) => {
              const curriDesc = item.description as string;
              setCurriListState((prevState) => [...prevState, curriDesc]);
            });

            // 이미지의 경우, 이하의 로직을 따름
            // 먼저 pamphlets, checkLists 안에 든 img(해당하는 이미지 이름)을 imageName에 저장함
            // 이후, 미리 만들어둔 ref를 통해 해당하는 폴더에 든 이미지들을 불러옴(listAll)
            // 이 요청으로 이미지에 대한 정보를 불러 왔다면(response.items), 미리 지정해둔 imageName과 대조해봄
            // 불러온 이미지의 이름과 imageName이 같다면, 해당하는 이미지의 파일과 url을 각각 해당하는 state에 다운받음
            // firebase의 해당 강의가 저장된 폴더의 url에 접근하여 해당하는 이미지 파일을 각각 다운받음
            // 강의 관련 사진 다운로드해서 pamphletsImgState에 저장
            getPamphletImgUrls(res.pamphlets, Number(lessonId.lessonId)).then(
              (urls: any[]) => {
                setLessonImgSrcListState(urls);
              },
            );
            getCheckImgUrls(res.checkLists, Number(lessonId.lessonId)).then(
              (urls: any[]) => {
                setMaterialImgSrcListState(urls);
              },
            );
            getPamphletImgFiles(res.pamphlets, Number(lessonId.lessonId)).then(
              (files: any[]) => {
                setLessonImgFileListState(files);
              },
            );
            getCheckImgFiles(res.checkLists, Number(lessonId.lessonId)).then(
              (files: any[]) => {
                setMaterialImgFileListState(files);
              },
            );
          }
        } else {
          alert(res?.message);
        }
      };
      fetchData();
    }
  }, []);

  const handleCreateLessonSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    // 만약 키트 가격이 0일 시, 해당 옵션을 선택하지 않은 것으로 판단하고 키트 설명을 삭제함
    if (kitPriceState === 0) {
      setKitDescState('');
    }
    if (
      // 만약 필수 조건이 비지 않았다면, 뒤의 코드를 실행함
      // 만약 입력하지 않은 상태라면, 입력하도록 else if로 예외조건 처리함
      lessonNameState !== '' &&
      categorySelectState !== '' &&
      curriListState.length !== 0 &&
      maximumState !== 0 &&
      basicPriceState !== 0
    ) {
      // array 형태로 넣어야 할 데이터는, 해당 형식에 맞게 다시 재생성함
      const pamphletList: ImageType[] = lessonImgFileListState.map(
        (Img: any) => {
          return {
            img: Img.name as string,
          };
        },
      );

      const checkList: ImageType[] = materialImgFileListState.map(
        (Img: any) => {
          return {
            img: Img.name,
          };
        },
      );
      const curriculumList: CurriculumType[] = curriListState.map(
        (curriculum: string, id: number) => {
          return {
            stage: id as number,
            description: curriculum as string,
          };
        },
      );
      const EditLessonRequestBody: LessonRequest = {
        category: categorySelectState,
        checkList: checkList as ImageListType[],
        cklsDescription: materialDescState,
        curriculumList: curriculumList as CurriculumType[],
        description: lessonDescState,
        email: userInfo?.email,
        kitDescription: kitDescState,
        kitPrice: kitPriceState,
        maximum: maximumState,
        name: lessonNameState,
        pamphletList: pamphletList as ImageListType[],
        price: basicPriceState,
        runningtime: runningtimeState,
      };
      const res = await updateLesson(
        EditLessonRequestBody,
        Number(lessonId.lessonId),
      );
      if (res?.message === 'SUCCESS') {
        // 만약 강의 수정에 성공했을 시, 이하 코드를 실행함
        // 만약 image의 속성이 Blob이 아닐 시(=이미 db에 저장된 이미지일 시) 그냥 pass함
        // 만약 속성이 Blob이라면, 새로 업로드할 이미지라는 뜻임
        // 이하 코드를 실행하여 이미지를 firebase에 업로드 함
        if (lessonImgFileListState.length !== 0) {
          doUploadImage(
            lessonImgFileListState,
            Number(lessonId.lessonId),
            'pamphlet_images',
          );
        }
        if (materialImgFileListState.length !== 0) {
          doUploadImage(
            materialImgFileListState,
            Number(lessonId.lessonId),
            'checklist_images',
          );
        }
        if (deleteImgList) {
          doDeleteImageFiles(deleteImgList);
        }
        // 이후 사용자에게 강의 정보가 수정되었음을 알린 후 메인 페이지로 이동
        alert('강의가 수정되었습니다.');
        navigate(`/`);
      } else {
        alert('다시 시도해주십시오.');
      }

      //  필수 입력 항목을 입력하지 않았을 경우 예외조건 처리함
    } else if (lessonNameState === '') {
      alert('클래스 이름을 입력해주세요.');
      setSelectedComponent(1);
    } else if (categorySelectState === '') {
      alert('카테고리를 선택해주세요.');
      setSelectedComponent(1);
    } else if (curriListState.length === 0) {
      alert('커리큘럼을 하나 이상 등록해주세요.');
      setSelectedComponent(5);
    } else if (maximumState === 0) {
      alert('강의에 참여할 수 있는 최대 인원을 설정해주세요.');
      setSelectedComponent(5);
    } else if (basicPriceState === 0) {
      alert('강의 기본 가격을 설정해주세요.');
      setSelectedComponent(6);
    }
  };

  return (
    <div className="page update-lesson-page">
      <Header />
      {/* 페이지 제목 지정 */}
      <h1>클래스 간편 수정하기</h1>
      {/* 카드로 form이 들어갈 영역 지정 */}
      {/* selectedComponent 값이 변환될 시, 해당하는 컴포넌트를 리렌더링함 */}
      {/* 해당하는 component에 필요한 props를 상속시켜줌 */}
      <Card className="update-lesson-page__card">
        {selectedComponent === 1 && (
          <StepOne
            lessonNameState={lessonNameState}
            setLessonNameState={setLessonNameState}
            categorySelectState={categorySelectState}
            setCategorySelectState={setCategorySelectState}
          />
        )}
        {selectedComponent === 2 && (
          <StepTwo
            limitNumber={5}
            deleteImgList={deleteImgList}
            setDeleteImgList={setDeleteImgList}
            imgFileListState={lessonImgFileListState}
            setImgFileListState={setLessonImgFileListState}
            imgSrcListState={lessonImgSrcListState}
            setImgSrcListState={setLessonImgSrcListState}
          />
        )}
        {selectedComponent === 3 && (
          <StepThree
            lessonDescState={lessonDescState}
            setLessonDescState={setlessonDescState}
          />
        )}
        {selectedComponent === 4 && (
          <StepFour
            limitNumber={10}
            deleteImgList={deleteImgList}
            setDeleteImgList={setDeleteImgList}
            imgSrcListState={materialImgSrcListState}
            setImgSrcListState={setMaterialImgSrcListState}
            imgFileListState={materialImgFileListState}
            setImgFileListState={setMaterialImgFileListState}
            materialDescState={materialDescState}
            setMaterialDescState={setMaterialDescState}
          />
        )}
        {selectedComponent === 5 && (
          <StepFive
            curriListState={curriListState}
            setCurriListState={setCurriListState}
            maximumState={maximumState}
            setMaximumState={setMaximumState}
            runningtimeState={runningtimeState}
            setRunningtimeState={setRunningtimeState}
          />
        )}
        {selectedComponent === 6 && (
          <StepSix
            basicPriceState={basicPriceState}
            setBasicPriceState={setBasicPriceState}
            kitDescState={kitDescState}
            setKitDescState={setKitDescState}
            kitPriceState={kitPriceState}
            setKitPriceState={setKitPriceState}
          />
        )}
        {/* 렌더링되는 컴포넌트가 무엇인지에 따라 버튼의 모습도 변화함 */}
        {/* 만약 selectedComponent의 값이 0이라면, 이전 단계를 볼 필요가 없으므로 해당 버튼을 숨김 */}
        {/* 이전 단계 버튼의 경우, 클릭할 때마다 onClick event로 selectedComponent 값을 1 감소시킴 */}
        {/* 이를 통해 현재 렌더링되는 컴포넌트를 리렌더링을 통해 변화시킴 */}
        <CardActions className="update-lesson-page__card-footer">
          {selectedComponent === 1 ? null : (
            <button
              type="button"
              className="button"
              onClick={() => setSelectedComponent(selectedComponent - 1)}
            >
              이전 단계
            </button>
          )}
          {/* 반대로 다음 단계 버튼의 경우, selectedComponent의 값이 6이라면 다음 단계 대신 강의 생성 버튼을 보이도록 함 */}
          {/* 마찬가지로 다음 단계 버튼의 경우 누를 때마다 selectedComponent 값을 1씩 증가시켜 재렌더링을 유도함 */}
          {selectedComponent === 6 ? (
            <button
              type="button"
              onClick={handleCreateLessonSubmit}
              className="button update-lesson-page__button--right update-lesson-page__button--finish"
            >
              클래스 수정
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSelectedComponent(selectedComponent + 1)}
              className="button update-lesson-page__button--right"
            >
              다음 단계
            </button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
export default UpdateLessonPage;
