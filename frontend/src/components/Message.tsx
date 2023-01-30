import React from 'react';

import useTimeStamp from '../utils/TimeStamp';

const Message = ({ message }: any) => {
  const { toHourMinute } = useTimeStamp();
  return (
    <div className="message">
      <div>{message.from}</div>
      <div>{message.message}</div>
      <div>{toHourMinute(message.creationTime)}</div>
      <div>{message.role}</div>
    </div>
  );
};

export default Message;
