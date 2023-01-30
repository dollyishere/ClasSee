import moment from 'moment';

const TimeStamp = () => {
  const toHourMinute = (timestamp: string) => {
    const date = new Date(timestamp);

    return moment(date).format('LT');
  };

  return {
    toHourMinute,
  };
};

export default TimeStamp;
