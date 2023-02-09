import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilValue } from 'recoil';

import TopRoutes from './TopRoutes';
import './App.css';
import './styles/main.scss';

import useUserApi from './apis/UserApi';
import privateInfoState from './models/PrivateInfoAtom';
import { decryptToken, encryptToken } from './utils/Encrypt';

const App = () => {
  return (
    <RecoilRoot>
      <div className="App">
        <TopRoutes />
      </div>
    </RecoilRoot>
  );
};

export default App;
