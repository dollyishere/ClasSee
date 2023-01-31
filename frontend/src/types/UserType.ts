export interface SignUpRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  address: string;
  phone: string;
}

export interface SignUpResponse {
  message: string;
  statusCode: number;
}
