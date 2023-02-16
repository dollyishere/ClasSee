import React, { useState } from 'react';

import useTimeStamp from '../utils/TimeStamp';

const Message = ({ message }: any) => {
  const { toHourMinute } = useTimeStamp();
  const [msg, setMsg] = useState(JSON.parse(message.message));
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
      <div className="message__time">{toHourMinute(msg.time)}</div>
      <div className="message__message">{msg.message}</div>
    </div>
  );
};

export default Message;
