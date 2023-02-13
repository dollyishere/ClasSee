export interface CreateNoticeRequest {
  title: string;
  email: string;
  content: string;
  img: string;
}

export interface NoticeType {
  id: number;
  title: string;
  content: string;
  img: string;
  userNickname: string;
  regtime: string;
}
