import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import {
  Card,
  CardContent,
  Box,
  Button,
  Modal,
  Typography,
  Checkbox,
  TextField,
} from '@mui/material';

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [showBody, setShowBody] = useState(false);

  // 컴포넌트 전환에 필요한 useNavigate 재할당
  const navigate = useNavigate();

  // 강의 개설을 신청하는 유저의 이메일 정보를 useRecoilValue를 통해 불러옴
  const userInfo = useRecoilValue(PrivateInfoState);
  const checkedPrice =
    openLessonInfo.userPoint -
    (openLessonInfo.lessonPrice + openLessonInfo.kitPrice);
  const noCheckedPrice = openLessonInfo.userPoint - openLessonInfo.lessonPrice;
  const checkedTotalPrice =
    openLessonInfo.lessonPrice + openLessonInfo.kitPrice;
  const noCheckedTotalPrice = openLessonInfo.lessonPrice;
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
        console.log(res);
        if (res?.statusCode === 200) {
          alert('신청이 완료되었습니다.');
          navigate('/');
        } else if (res?.data.statusCode === 409) {
          alert('이미 신청한 클래스입니다.');
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
          if (res.lessonTeacherName !== userInfo.name) {
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
            alert('자신이 개설한 클래스는 신청이 불가능합니다.');
            navigate(`/lesson/${openLessonId.lessonId}`);
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
            <img
              src={lessonImage}
              alt={lessonImage}
              className="lesson-enroll-page__pre-img"
            />
            <CardContent className="lesson-enroll-page__all-content">
              <h2>강의명</h2>
              <p>{openLessonInfo.lessonName}</p>
              <h2>강사명</h2>
              <p>{openLessonInfo.lessonTeacherName}</p>
              <h2>일자</h2>
              <p>
                {openLessonInfo.lessonStartTime.slice(0, 4)}년{' '}
                {openLessonInfo.lessonStartTime.slice(5, 7)}월{' '}
                {openLessonInfo.lessonStartTime.slice(8, 10)}일{' '}
                {openLessonInfo.lessonStartTime.slice(11, 13)}시{' '}
                {openLessonInfo.lessonStartTime.slice(14, 16)}분
              </p>
            </CardContent>
          </Card>
          <Card className="lesson-enroll-page__userInfo">
            <div className="lesson-enroll-page__card-header">신청자 정보</div>
            <CardContent className="lesson-enroll-page__all-content">
              <h2>이름</h2>
              <p>{openLessonInfo.userName}</p>
              <h2>닉네임</h2>
              <p>{openLessonInfo.userNickname}</p>
              <h2>전화번호</h2>
              <p>*전화번호 변경 시, 번호만 입력해주시기 바랍니다.</p>
              <TextField
                required
                variant="outlined"
                type="text"
                value={phoneNumberState}
                defaultValue={openLessonInfo.userPhone}
                placeholder="번호를 입력해주십시오."
                onChange={handleInputPhoneNumber}
              />
              <h2>이메일</h2>
              <p>{openLessonInfo.userEmail}</p>
              <h2>주소</h2>
              <p>{openLessonInfo.userAddress}</p>
            </CardContent>
          </Card>
        </div>
        <div className="lesson-enroll-page__right-content">
          <Card className="lesson-enroll-page__payment-block">
            <div className="lesson-enroll-page__card-header">결제 정보</div>
            <CardContent className="lesson-enroll-page__all-content">
              <h2>수강료</h2>
              <div className="lesson-enroll-page__payment-value-also-kit">
                <p className="lesson-enroll-page__payment-value">
                  {openLessonInfo.lessonPrice.toLocaleString()} P
                </p>
                {/* <h2>포인트</h2>
          <p>{openLessonInfo.userPoint}</p> */}
                <div className="lesson-enroll-page__kit-check">
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                  <h4>키트 추가</h4>
                </div>
                <p>+{openLessonInfo.kitPrice.toLocaleString()} P</p>
              </div>
              <h2>총 결제 금액</h2>
              <p className="lesson-enroll-page__payment-value">
                {checked ? (
                  <h5>{checkedTotalPrice.toLocaleString()} P</h5>
                ) : (
                  <h5> {noCheckedTotalPrice.toLocaleString()} P </h5>
                )}
              </p>
              <div className="lesson-enroll-page__payment-content">
                <h3>현재 포인트</h3>
                <p className="lesson-enroll-page__payment-value">
                  {openLessonInfo.userPoint.toLocaleString()} P
                </p>
                <hr />
                <h3>결제 후 포인트</h3>
                <p className="lesson-enroll-page__payment-value">
                  {checked ? (
                    <h3>{checkedPrice.toLocaleString()} P </h3>
                  ) : (
                    <h3>{noCheckedPrice.toLocaleString()} P</h3>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={handleLessonEnroll}
            variant="contained"
            className="lesson-enroll-page__enroll-btn"
          >
            결제하기
          </Button>
          <Button onClick={handleOpen}>취소, 환불 규정</Button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="lesson-enroll-page__modal">
          <h1 className="lesson-enroll-page__modal-title">취소, 환불 규정</h1>
          <div className="lesson-enroll-page__modal-content">
            <p className="lesson-enroll-page__modal-content-announce">
              * 수강생 강의 환불 시
            </p>
            <div className="lesson-enroll-page__modal-content-list">
              <h3>1. 강의 시작 5일 전</h3>
              <p>수강료의 100% 환불</p>
              <h3>2. 강의 시작 3일 전</h3>
              <p>수강료의 50% 환불</p>
              <h3>3. 강의 시작 1일 전 혹은 당일</h3>
              <p>수강료 환불 불가</p>
            </div>
            <p className="lesson-enroll-page__modal-content-announce">
              * 강사가 강의 시작 전 취소 시 전액 환불 해드립니다.
            </p>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default LessonEnrollPage;
