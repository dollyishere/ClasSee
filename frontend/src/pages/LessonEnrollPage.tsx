import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Card, CardContent, Stack, Button, Checkbox } from '@mui/material';

import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/Firebase';

import Header from '../components/Header';

import PrivateInfoState from '../models/PrivateInfoAtom';
import LessonDetailViewModel from '../viewmodels/LessonDetailViewModel';

import { OpenLessonResponse, LessonEnrollRequest } from '../types/LessonsType';

const LessonEnrollPage = () => {
  const openLessonId = useParams();
  const { getOpenLessonDetail, doLessonEnroll } = LessonDetailViewModel();
  const [openLessonInfo, setOpenLessonInfo] = useState({
    kitPrice: 0 as number,
    message: '' as string,
    statusCode: 0 as number,
    lessonImg: '' as string,
    lessonName: '' as string,
    lessonPrice: 0 as number,
    lessonStartTime: '' as string,
    lessonTeacherName: '' as string,
    userAddress: '' as string,
    userEmail: '' as string,
    userName: '' as string,
    userNickname: '' as string,
    userPhone: '' as string,
    userPoint: 0 as number,
  });
  const [lessonImage, setLessonImage] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [phoneNumberState, setPhoneNumberState] = React.useState(
    openLessonInfo.userPhone,
  );

  const [showBody, setShowBody] = useState(false);

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(PrivateInfoState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleLessonEnroll = async (event: React.MouseEvent<HTMLElement>) => {
    let totalPrice;
    if (checked) {
      totalPrice = openLessonInfo.lessonPrice + openLessonInfo.kitPrice;
    } else {
      totalPrice = openLessonInfo.lessonPrice;
    }
    if (window.confirm('클래스를 신청하시겠습니까?')) {
      if (phoneNumberState.includes('-')) {
        alert('"-"를 제외한 번호만 입력해주시기 바랍니다.');
      } else if (phoneNumberState.length < 8) {
        alert('정확한 번호를 입력해주시기 바랍니다.');
      } else if (openLessonInfo.userPoint - totalPrice < 0) {
        alert('잔액이 부족합니다.');
        navigate('/');
      } else {
        const LessonEnrollRequestBody: LessonEnrollRequest = {
          email: openLessonInfo.userEmail as string,
          openLessonId: Number(openLessonId.openLessonId) as number,
          phone: phoneNumberState as string,
          price: totalPrice as number,
        };
        const res = await doLessonEnroll(LessonEnrollRequestBody);
        if (res?.statusCode === 200) {
          alert('신청이 완료되었습니다.');
          navigate('/');
        } else {
          alert('다시 시도해주십시오.');
        }
      }
    }
  };

  useEffect(() => {
    setPhoneNumberState(openLessonInfo.userPhone);
  }, [openLessonInfo]);

  const handleInputPhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPhoneNumberState(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo === null) {
        alert('로그인 후 이용 가능합니다.');
        navigate('/login');
      } else {
        const res = await getOpenLessonDetail(
          userInfo.email,
          Number(openLessonId.openLessonId),
        );
        if (res) {
          if (res.lessonTeacherName === res.userName) {
            setOpenLessonInfo(res);
            const imgRef = ref(
              storage,
              `lessons/${Number(
                openLessonId.lessonId,
              )}/pamphlet_images/${encodeURI(res.lessonImg)}`,
            );
            const url = await getDownloadURL(imgRef);
            setLessonImage(url);
          } else {
            alert('자신이 개설한 클래스는 신청이 불가합니다.');
            navigate(`/`);
          }
        } else {
          alert('다시 시도해주세요.');
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="lesson-enroll-page-container">
      <Header />
      <div className="lesson-enroll-page__body">
        <div className="lesson-enroll-page__left-content">
          <Card className="lesson-enroll-page__lessonInfo">
            <div className="lesson-enroll-page__card-header">강의 정보</div>
            <img src={lessonImage} alt={lessonImage} />
            <h3>강의명</h3>
            <p>{openLessonInfo.lessonName}</p>
            <h3>강사명</h3>
            <p>{openLessonInfo.lessonTeacherName}</p>
            <h3>일자</h3>
            <p>
              {openLessonInfo.lessonStartTime.slice(0, 4)}년{' '}
              {openLessonInfo.lessonStartTime.slice(5, 7)}월{' '}
              {openLessonInfo.lessonStartTime.slice(8, 10)}일{' '}
              {openLessonInfo.lessonStartTime.slice(11, 13)}시{' '}
              {openLessonInfo.lessonStartTime.slice(14, 16)}분
            </p>
          </Card>
          <Card className="lesson-enroll-page__userInfo">
            <div className="lesson-enroll-page__card-header">신청자 정보</div>
            <h3>이름</h3>
            <p>{openLessonInfo.userName}</p>
            <h3>닉네임</h3>
            <p>{openLessonInfo.userNickname}</p>
            <h3>전화번호</h3>
            <p>*전화번호 변경 시, 번호만 입력해주시기 바랍니다.</p>
            <input
              type="text"
              value={phoneNumberState}
              defaultValue={openLessonInfo.userPhone}
              placeholder="번호를 입력해주십시오."
              onChange={handleInputPhoneNumber}
            />
            <h3>이메일</h3>
            <p>{openLessonInfo.userEmail}</p>
            <h3>주소</h3>
            <p>{openLessonInfo.userAddress}</p>
          </Card>
        </div>
        <div className="lesson-enroll-page__right-content">
          <Card className="lesson-enroll-page__payment-block">
            <div className="lesson-enroll-page__card-header">결제 정보</div>
            <h3>수강료</h3>
            <p>{openLessonInfo.lessonPrice}</p>
            {/* <h3>포인트</h3>
          <p>{openLessonInfo.userPoint}</p> */}
            <h3>키트 추가</h3>
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <h3>총 결제 금액</h3>
            <p>
              {checked
                ? openLessonInfo.lessonPrice + openLessonInfo.kitPrice
                : openLessonInfo.lessonPrice}
            </p>
            <h4>현재 포인트</h4>
            <p>{openLessonInfo.userPoint}</p>
            <hr />
            <h4>결제 후 포인트</h4>
            <p>
              {checked
                ? openLessonInfo.userPoint -
                  (openLessonInfo.lessonPrice + openLessonInfo.kitPrice)
                : openLessonInfo.userPoint - openLessonInfo.lessonPrice}
            </p>
          </Card>
          <Button onClick={handleLessonEnroll}>결제하기</Button>
          <span>취소, 환불 규정</span>
        </div>
      </div>
    </div>
  );
};
export default LessonEnrollPage;
