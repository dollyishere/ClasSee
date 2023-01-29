import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { OpenVidu, Session, Publisher, StreamManager } from 'openvidu-browser';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';

import useViewModel from '../viewmodels/LessonViewModel';
import UserVideo from '../components/UserVideo';
import ChatBox from '../components/ChatBox';

const LessonPage = () => {
  const location = useLocation();
  const role = location.pathname.split('/')[3];
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isChatBoxVisible, setChatBoxVisible] = useState<boolean>(false);
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

  const { getToken, chat } = useViewModel();

  // 세션에서 나간 사람을 subscribers에서 제거
  const deleteSubscriber = (streamManager: any) => {
    const data = JSON.parse(streamManager.stream.connection.data);
    if (data.role === 'student') {
      const newSubscribers = subscribers;
      const index = newSubscribers.indexOf(streamManager, 0);

      if (index > -1) {
        newSubscribers.splice(index, 1);
        setSubscribers([...newSubscribers]);
      }
    } else if (data.role === 'teacher') {
      setTeacherStreamManager(undefined);
    }
  };

  const leaveSession = () => {
    session?.disconnect();

    setOV(null);
    setSubscribers([]);
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

      newSession.on('signal:chat', (event: any) => {
        console.log(event.data);
        console.log(JSON.parse(event.from.data).clientData);
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
      if (session !== undefined) chat(session, 'hi');
    }
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  const handleVideoClick = (num: number) => {
    if (num >= 0) {
      setStudentStreamManager(subscribers[num]);
    } else {
      const newSubscribers = subscribers;
      if (studentStreamManager !== undefined) {
        setStudentStreamManager(undefined);
      }
    }
    setIsFocused((prev) => !prev);
  };

  const toggleChatBox = () => {
    setChatBoxVisible((prev: boolean) => !prev);
  };
  return (
    <div className="page lesson-page">
      <div className="lesson-page__content">
        <div className="lesson-page__header">헤더</div>
        <div className="lesson-page__videos">
          <div className="lesson-page__video--students-left">
            {isFocused ? (
              <div className="lesson-page__video--student">
                <div
                  role="presentation"
                  className="lesson-page__student-stream-container"
                  onClick={() => handleVideoClick(-1)}
                >
                  <UserVideo streamManager={studentStreamManager} />
                </div>
              </div>
            ) : (
              <div className="lesson-page__video--students-group">
                <div className="lesson-page__video--students-col">
                  {subscribers.map((sub: any, i: number) =>
                    i % 3 === 1 ? (
                      <div
                        role="presentation"
                        className="lesson-page__stream-container"
                        onClick={() => handleVideoClick(i)}
                      >
                        <UserVideo streamManager={sub} />
                      </div>
                    ) : null,
                  )}
                </div>
                <div className="lesson-page__video--students-col">
                  {subscribers.map((sub: any, i: number) =>
                    i % 3 === 0 ? (
                      <div
                        role="presentation"
                        className="lesson-page__stream-container"
                        onClick={() => handleVideoClick(i)}
                      >
                        <UserVideo streamManager={sub} />
                      </div>
                    ) : null,
                  )}
                </div>
                <div className="lesson-page__video--students-col">
                  {subscribers.map((sub: any, i: number) =>
                    i % 3 === 2 ? (
                      <div
                        role="presentation"
                        className="lesson-page__stream-container"
                        onClick={() => handleVideoClick(i)}
                      >
                        <UserVideo streamManager={sub} />
                      </div>
                    ) : null,
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="lesson-page__video--teacher">
            <div className="lesson-page__teacher-stream-container">
              {teacherStreamManager !== undefined ? (
                <UserVideo streamManager={teacherStreamManager} />
              ) : null}
            </div>
          </div>
          {isFocused ? (
            <div className="lesson-page__video--students-bottom">
              {subscribers.map((sub: any) =>
                studentStreamManager !== sub ? (
                  <div className="lesson-page__stream-container">
                    <UserVideo streamManager={sub} />
                  </div>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
        <div className="lesson-page__footer">
          <div className="lesson-page__buttons">
            <button
              type="button"
              className="lesson-page__button lesson-page__button--quit"
              onClick={window.close}
            >
              <PhoneIcon fontSize="large" />
            </button>
            <button
              type="button"
              className="lesson-page__button lesson-page__button--msg"
              onClick={toggleChatBox}
            >
              <MessageIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
      {isChatBoxVisible ? (
        <ChatBox toggleChatBox={toggleChatBox} chat={chat} session={session} />
      ) : null}
    </div>
  );
};

export default LessonPage;
