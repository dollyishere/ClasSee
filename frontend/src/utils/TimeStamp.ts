import moment from 'moment';

const TimeStamp = () => {
  const toHourMinute = () => {
    return moment().format('LT');
  };

  const toDateHourMinute = (timeStamp: string) => {
    return moment(timeStamp).format('YYYY/MM/DD hh:mm');
  };

  const toDate = () => {
    return moment().format('YYYY.MM.DD');
  };

  return {
    toHourMinute,
    toDateHourMinute,
    toDate,
  };
};

export default TimeStamp;
