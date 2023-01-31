import util from 'util';
import crypto from 'crypto';

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

// salt를 만드는 함수
export const createSalt = async () => {
  const buf = await randomBytesPromise(64);
  return buf.toString('base64');
};

// salt와 평문 비밀번호로 암호화된 비밀번호를 만드는 함수
export const createHashedPassword = async (
  plainPassword: string,
  salt: string,
) => {
  // plainPassword를 salt와 함께 707번 암호화, 64바이트 길이로, 사용하는 알고리즘은 sha256
  const key = await pbkdf2Promise(plainPassword, salt, 707, 64, 'sha512');
  const hashedPassword = key.toString('base64');

  return hashedPassword;
};
