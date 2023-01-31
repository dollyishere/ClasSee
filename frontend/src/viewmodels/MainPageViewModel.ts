import MyCreatedLessonsApi from '../apis/LessonsApi';

const MainPageViewModel = () => {
  const MyCreatedLessons = async () => {
    const response = await <MyCreatedLessonsApi />;
    return response.data;
  };

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  const createToken = async (sessionId: string) => {
    const response = await axios.post(
      `http://localhost:5000/api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );

    return response.data;
  };

  const createSession = async (sessionId: string) => {
    const response = await axios.post(
      `http://localhost:5000/api/sessions`,
      { customSessionId: sessionId },
      { headers: { 'Content-Type': 'application/json' } },
    );
    return response.data;
  };
  const getToken = async (mySessionId: string) => {
    const sessionId = await createSession(mySessionId);
    const token = await createToken(sessionId);
    return token;
  };

  const chat = (session: Session, message: string) => {
    session
      .signal({
        data: message,
        to: [],
        type: 'chat',
      })
      .then(() => {
        console.log('Message successfully sent');
      })
      .catch((error: any) => {
        console.log(error);
      });
  };
  return {
    getToken,
    chat,
  };
};

export default MainPageViewModel;
