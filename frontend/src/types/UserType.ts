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

export interface SignUpResponse {
  message: string;
  statusCode: number;
}

export interface UserInfo {
  userId: string;
}
