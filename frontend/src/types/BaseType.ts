// 모든 요청의 응답에는 message와 statusCode가 존재하기 때문에 따로 뺌
// 이후 다른 Response에서 상속해서 사용
export interface Response {
  message: string;
  statusCode: number;
}
