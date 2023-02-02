import { Response } from './BaseType';

export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  birth: string;
  address: string;
  phone: string;
  salt: string;
}

export interface SaltResponse extends Response {
  salt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends Response {
  email: string;
}

export interface UserInfo {
  userId: string | null;
}
