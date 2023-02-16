import axios from 'axios';

const VideoCallApi = () => {
  const accesstoken = localStorage.getItem('accessToken');

  const doCreateToken = async (sessionId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/openvidu/sessions/${sessionId}/connections`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };
  const doCreateSession = async (email: string, sessionId: string) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/openvidu/sessions`,
        { customSessionId: sessionId },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return {
    doCreateToken,
    doCreateSession,
  };
};

export default VideoCallApi;
