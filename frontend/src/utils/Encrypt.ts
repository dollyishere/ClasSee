import CryptoJS from 'crypto-js';

// salt를 만드는 함수
export const createSalt = () => {
  // 256비트 랜덤값 32바이트 결과값
  return CryptoJS.lib.WordArray.random(256 / 32).toString();
};

// salt와 평문 비밀번호로 암호화된 비밀번호를 만드는 함수
export const createHashedPassword = (plainPassword: string, salt: string) => {
  // 256비트 랜덤값, 32바이트 결과값, 707번 반복
  return CryptoJS.PBKDF2(plainPassword, salt, {
    keySize: 256 / 32,
    iterations: 707,
  }).toString();
};
