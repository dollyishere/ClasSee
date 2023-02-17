import axios from 'axios';
import { Response } from '../types/BaseType';

const OrderApi = () => {
  const accessToken = localStorage.getItem('accessToken');
  const doChargePoint = async (email: string, point: number) => {
    try {
      const response = await axios.put<Response>(
        `${process.env.REACT_APP_SERVER_URI}/api/v1/orders/${email}/point?point=${point}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return {
    doChargePoint,
  };
};

export default OrderApi;
