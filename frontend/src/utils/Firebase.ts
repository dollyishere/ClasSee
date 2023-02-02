//! 1.  npm i fire base
//! 2. https://firebase.google.com/docs/web/setup 위 사이트에서 initialize 코드 붙여넣기
import { initializeApp } from 'firebase/app';
//! 5. 임포트해주기
import { getStorage } from 'firebase/storage';

// TODO: Replace the following with your app's Firebase project configuration
//! 3. 내 프로젝트 설정에 들어가서 나의 config를 붙여넣는다.  --> 연동설정 끝
//! 4. 파이어베이스 사이트에서 스토리지 만들어주기
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
//! 6 익스포트 해주기
export const storage = getStorage(app);
export default app;
