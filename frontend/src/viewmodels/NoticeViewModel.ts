import useApi from '../apis/NoticeApi';
import { CreateNoticeRequest } from '../types/NoticeType';

const NoticeViewModel = () => {
  const { doCreateNotice, doGetNotices } = useApi();

  const createNotice = async (notice: CreateNoticeRequest) => {
    const response = await doCreateNotice(notice);
    return response;
  };

  const getNotices = async (limit: number, offset: number) => {
    const response = await doGetNotices(limit, offset);
    return response;
  };

  return {
    createNotice,
    getNotices,
  };
};

export default NoticeViewModel;
