import moment from 'moment';

const TimeStamp = () => {
  const toHourMinute = (timeStamp: string | undefined) => {
    return moment(timeStamp).format('LT');
  };

  const toDateHourMinute = (timeStamp: string) => {
    return moment(timeStamp).format('YYYY/MM/DD hh:mm');
  };

  const toDate = (timeStamp: string | undefined) => {
    return moment(timeStamp).format('YYYY.MM.DD');
  };

  return {
    toHourMinute,
    toDateHourMinute,
    toDate,
  };
};

export default TimeStamp;
