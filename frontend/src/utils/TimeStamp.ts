import moment from 'moment';

const TimeStamp = () => {
  const toHourMinute = () => {
    return moment().format('LT');
  };

  return {
    toHourMinute,
  };
};

export default TimeStamp;
