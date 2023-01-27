import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { OpenVidu, Session, Publisher, StreamManager } from 'openvidu-browser';

import useViewModel from '../viewmodels/LessonViewModel';
import UserVideo from '../components/UserVideo';

const LessonPage = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[3];
  const [count, setCount] = useState<number>(0);
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [sessionId, setSessionId] = useState<string>(
    location.pathname.split('/')[2],
  ); // 현재 참여 중인 세션 아이디
  const [userName, setUserName] = useState<string>(
    `user${Math.floor(Math.random() * 100)}`,
  ); // 유저 이름
  const [session, setSession] = useState<Session>(); // 현재 세션 객체
  const [teacherStreamManager, setTeacherStreamManager] = useState<any>(); // 메인 화면
  const [studentStreamManager, setStudentStreamManager] =
    useState<StreamManager>();
  const [publisher, setPublisher] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]); // 세션 참여자
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>();

  const { getToken } = useViewModel();

  // 세션에서 나간 사람을 subscribers에서 제거
  const deleteSubscriber = (streamManager: any) => {
    const newSubscribers = subscribers;
    const index = newSubscribers.indexOf(streamManager, 0);

    if (index > -1) {
      newSubscribers.splice(index, 1);
      setSubscribers([...newSubscribers]);
    }
  };

  const leaveSession = () => {
    session?.disconnect();

    setOV(null);
    setSubscribers(Array(10).fill(undefined));
    setSession(undefined);
    setStudentStreamManager(undefined);
    setTeacherStreamManager(undefined);
    setPublisher(undefined);
  };
  const onbeforeunload = (event: any) => {
    event.preventDefault();
    leaveSession();
  };

  const joinSession = () => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    const newSession = newOV.initSession();

    setOV(newOV);
    setSession(newSession);

    const connection = () => {
      newSession.on('streamCreated', (event: any) => {
        const subscriber = newSession.subscribe(event.stream, undefined);
        const data = JSON.parse(subscriber.stream.connection.data);

        if (data.role === 'student') {
          const newSubscribers = subscribers;

          newSubscribers.push(subscriber);
          // for (let i = 0; i < 10; i += 1) {
          //   if (newSubscribers[i] === undefined) {
          //     newSubscribers[i] = subscriber;
          //     break;
          //   }
          // }
          setSubscribers([...newSubscribers]);
        } else {
          setTeacherStreamManager(subscriber);
        }
      });

      newSession.on('streamDestroyed', (event: any) => {
        deleteSubscriber(event.stream.streamManager);
      });
      newSession.on('exception', (exception: any) => {
        console.warn(exception);
      });
      getToken(sessionId).then((token: any) => {
        newSession
          .connect(token, { clientData: userName, role })
          .then(async () => {
            const newPublisher = await newOV.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x360',
              frameRate: 30,
              insertMode: 'APPEND',
              mirror: false,
            });

            newSession.publish(newPublisher);

            const devices = await newOV.getDevices();
            const videoDevices = devices.filter(
              (device: any) => device.kind === 'videoinput',
            );
            const currentVideoDeviceId = newPublisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .getSettings().deviceId;
            const newCurrentVideoDevice = videoDevices.find(
              (device: any) => device.deviceId === currentVideoDeviceId,
            );

            setCurrentVideoDevice(newCurrentVideoDevice);
            setPublisher(newPublisher);

            if (role === 'teacher') {
              setTeacherStreamManager(newPublisher);
            } else {
              setStudentStreamManager(newPublisher);
            }
          })
          .catch((error: any) => {
            console.log('Error', error.code, error.message);
          });
      });
    };
    connection();
  };

  window.addEventListener('beforeunload', onbeforeunload);

  useEffect(() => {
    if (!OV) {
      joinSession();
    }
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);
  return (
    <div className="page">
      <div className="lesson-page__header">헤더</div>
      <div className="lesson-page__videos">
        <div className="lesson-page__video--students">
          <div className="lesson-page__video--students-col">
            <div className="lesson-page__stream-container">
              {subscribers[1] !== undefined ? (
                <UserVideo streamManager={subscribers[1]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[4] !== undefined ? (
                <UserVideo streamManager={subscribers[4]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[7] !== undefined ? (
                <UserVideo streamManager={subscribers[7]} />
              ) : null}
            </div>
          </div>
          <div className="lesson-page__video--students-col">
            <div className="lesson-page__stream-container">
              {subscribers[0] !== undefined ? (
                <UserVideo streamManager={subscribers[0]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[3] !== undefined ? (
                <UserVideo streamManager={subscribers[3]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[6] !== undefined ? (
                <UserVideo streamManager={subscribers[6]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[9] !== undefined ? (
                <UserVideo streamManager={subscribers[9]} />
              ) : null}
            </div>
          </div>
          <div className="lesson-page__video--students-col">
            <div className="lesson-page__stream-container">
              {subscribers[2] !== undefined ? (
                <UserVideo streamManager={subscribers[2]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[5] !== undefined ? (
                <UserVideo streamManager={subscribers[5]} />
              ) : null}
            </div>
            <div className="lesson-page__stream-container">
              {subscribers[8] !== undefined ? (
                <UserVideo streamManager={subscribers[8]} />
              ) : null}
            </div>
          </div>
        </div>
        <div className="lesson-page__video--teacher">
          <div className="lesson-page__main-stream-container">
            {teacherStreamManager !== undefined ? (
              <UserVideo streamManager={teacherStreamManager} />
            ) : null}
          </div>
        </div>
      </div>
      <div className="lesson-page__footer">푸터</div>
    </div>
  );
};

export default LessonPage;
