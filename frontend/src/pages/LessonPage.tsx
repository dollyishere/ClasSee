import React, { useEffect, useState } from 'react';
import { OpenVidu, Session, Publisher, StreamManager } from 'openvidu-browser';

import useViewModel from '../viewmodels/LessonViewModel';
import UserVideo from '../components/UserVideo';

const LessonPage = () => {
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [sessionId, setSessionId] = useState<string>('test'); // 현재 참여 중인 세션 아이디
  const [userName, setUserName] = useState<string>(
    `user${Math.floor(Math.random() * 100)}`,
  ); // 유저 이름
  const [session, setSession] = useState<Session>(); // 현재 세션 객체
  const [mainStreamManager, setMainStreamManager] = useState<any>(); // 메인 화면
  const [publisher, setPublisher] = useState<Publisher>();
  const [subscribers, setSubscribers] = useState<Array<StreamManager>>([]); // 세션 참여자
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>();

  const { getToken } = useViewModel();

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
    setSubscribers([]);
    setSession(undefined);
    setMainStreamManager(undefined);
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
        const newSubscribers = subscribers;
        newSubscribers.push(subscriber);

        setSubscribers([...newSubscribers]);
      });

      newSession.on('streamDestroyed', (event: any) => {
        deleteSubscriber(event.stream.streamManager);
      });
      newSession.on('exception', (exception: any) => {
        console.warn(exception);
      });
      getToken(sessionId).then((token: any) => {
        newSession
          .connect(token, { clientData: userName })
          .then(async () => {
            const newPublisher = await newOV.initPublisherAsync(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              resolution: '640x480',
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
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
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
      <div className="session">
        <div className="session-header">{sessionId}</div>
        {mainStreamManager !== undefined ? (
          <UserVideo streamManager={mainStreamManager} />
        ) : null}
        <div className="video-container">
          {subscribers.map((sub: any) => (
            <div className="stream-container">
              <UserVideo streamManager={sub} />
            </div>
          ))}
        </div>
      </div>
      <button type="button" onClick={onbeforeunload}>
        버튼
      </button>
    </div>
  );
};

export default LessonPage;
