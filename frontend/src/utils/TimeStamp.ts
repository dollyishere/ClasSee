import moment from 'moment';

const TimeStamp = () => {
  const toHourMinute = () => {
    return moment().format('LT');
  };

  const toDateHourMinute = (timeStamp: string) => {
    return moment(timeStamp).format('YYYY/MM/DD hh:mm');
  };

  return {
    toHourMinute,
    toDateHourMinute,
  };
};

export default TimeStamp;
