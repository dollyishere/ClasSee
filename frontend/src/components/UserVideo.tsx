import React from 'react';

import OpenViduVideo from './OpenViduVideo';

const UserVideo = ({ streamManager }: any) => {
  const getNicknameTag = () => {
    if (streamManager.stream.connection === undefined) {
      return null;
    }
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideo streamManager={streamManager} />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideo;
