import React, { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const ChatBox = ({ toggleChatBox, chat, session }: any) => {
  const messageRef = useRef(null);
  const test = (e: any) => {
    e.preventDefault();
    if (messageRef?.current) {
      const target = messageRef.current as HTMLInputElement;

      chat(session, target.value);

      target.value = '';
    }
  };
  return (
    <div className="chat-box">
      <div className="chat-box__header">
        <span>메시지</span>
        <button
          type="button"
          onClick={toggleChatBox}
          className="chat-box__close-btn"
        >
          <CloseIcon fontSize="medium" />
        </button>
      </div>
      <div className="chat-box__message-box">메시지</div>
      <form onSubmit={test} className="chat-box__form">
        <input type="text" className="chat-box__input" ref={messageRef} />
      </form>
    </div>
  );
};

export default ChatBox;
