import React from 'react';

import useTimeStamp from '../utils/TimeStamp';

const Message = ({ message }: any) => {
  const { toHourMinute } = useTimeStamp();

  return (
    <div className="message">
      <div
        className={
          message.role === 'teacher'
            ? 'message__sender--teacher message__sender'
            : 'message__sender--student message__sender'
        }
      >
        {message.from}
      </div>
      <div className="message__time">{toHourMinute()}</div>
      <div className="message__message">{message.message}</div>
    </div>
  );
};

export default Message;
