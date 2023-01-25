import React, { useEffect, useState } from 'react';
import { OpenVidu, Session } from 'openvidu-browser';

import useViewModel from '../viewmodels/LectureViewModel';
import UserVideo from '../components/UserVideo';

const LecturePage = () => {
  const [OV, setOV] = useState<any>();
  const [sessionId, setSessionId] = useState<string>('test'); // 현재 참여 중인 세션 아이디
  const [userName, setUserName] = useState<string>(
    `user${Math.floor(Math.random() * 100)}`,
  ); // 유저 이름
  const [session, setSession] = useState<Session>(); // 현재 세션 객체
  const [mainStreamManager, setMainStreamManager] = useState(undefined); // 메인 화면
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState<any[]>([]); // 세션 참여자
  const [currentVideoDevice, setCurrentVideoDevice] = useState<any>();

  const { getToken } = useViewModel();

  const deleteSubscriber = (streamManager: any) => {
    const index = subscribers.indexOf(streamManager, 0);

    if (index > -1) {
      const newSubscribers = subscribers.splice(index, 1);
      setSubscribers(newSubscribers);
    }
  };

  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    setOV(null);

    setSession(undefined);
    setSubscribers([]);
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const onbeforeunload = () => {
    leaveSession();
  };
  // 마운트시 한 번만 실행
  useEffect(() => {
    setOV(new OpenVidu()); // OpenVidu 객체
    window.addEventListener('beforeunload', onbeforeunload);
  }, []);

  useEffect(() => {
    if (OV) {
      setSession(OV.initSession()); // OpenVidu initSession 함수를 통해 세션 초기화
    }
  }, [OV]);

  // session state가 update될 때 마다 실행
  useEffect(() => {
    const mySession = session;

    mySession?.on('streamCreated', (e: any) => {
      const subscriber = mySession.subscribe(e.stream, undefined);
      const newSubscribers = [...subscribers];

      newSubscribers.push(subscriber);

      setSubscribers(newSubscribers);
      console.log(e);
    });

    mySession?.on('streamDestroyed', (e: any) => {
      deleteSubscriber(e.stream.streamManager);
    });

    mySession?.on('exception', (exception: any) => {
      console.warn(exception);
    });

    getToken(sessionId)
      .then((token: any) => {
        session?.connect(token, { clientData: userName }).then(async () => {
          const pub = await OV.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'Append',
            mirror: false,
          });

          session.publish(pub);

          const devices = await OV.getDevices();
          const videoDevices = devices.filter(
            (device: any) => device.kind === 'videoinput',
          );
          const currentVideoDeviceId = pub.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const videoDevice = videoDevices.find(
            (device: any) => device.deviceId === currentVideoDeviceId,
          );

          setCurrentVideoDevice(videoDevice);
          setMainStreamManager(pub);
          setPublisher(pub);
        });
      })
      .catch((error: any) => {
        console.log(
          'there was an error connecting to the session',
          error.code,
          error.message,
        );
      });
  }, [session]);

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
    </div>
  );
};

export default LecturePage;
