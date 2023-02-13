import useApi from '../apis/NoticeApi';
import { CreateNoticeRequest } from '../types/NoticeType';

const NoticeViewModel = () => {
  const { doCreateNotice } = useApi();

  const createNotice = async (notice: CreateNoticeRequest) => {
    const response = await doCreateNotice(notice);
    return response;
  };

  return {
    createNotice,
  };
};

export default NoticeViewModel;
