import React, { useRef, useEffect } from 'react';

const OpenViduVideo = ({ streamManager }: any) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);
  useEffect(() => {
    if (streamManager && !!videoRef) {
      streamManager.addVideoElement(videoRef.current);
    }
  });
  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video autoPlay ref={videoRef} />;
};

export default OpenViduVideo;
