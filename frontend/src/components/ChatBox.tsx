import React, { useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import Message from './Message';

const ChatBox = ({
  toggleChatBox,
  chat,
  session,
  messages,
  setMessages,
  userName,
  role,
}: any) => {
  // 메시지 전송 input에 접근하기 위한 hook
  const messageRef = useRef(null);

  // 메시지 박스의 스크롤을 다루기 위한 hook
  const messageBoxRef = useRef<null | HTMLDivElement>(null);

  // 메시지 박스의 스크롤을 강제로 아래로 내리기 위한 함수
  const scrollToBottom = () => {
    if (messageBoxRef.current !== null) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  // 메시지 전송 처리 함수
  const submitMessage = (e: any) => {
    // 새로고침 방지
    e.preventDefault();

    if (messageRef?.current) {
      const target = messageRef.current as HTMLInputElement;

      // 입력한 메시지 messages에 추가
      const message = {
        message: target.value,
        creationTime: new Date().getTime(),
        from: userName,
        role,
      };

      // const newMessages = messages;
      // newMessages.push(message);
      // setMessages([...newMessages]);

      // 메시지 전송
      chat(session, target.value);

      // 입력 후에 input을 비움
      target.value = '';
    }
  };

  // messages가 update될 때 마다 scrollToBottom 함수 실행
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-box">
      {/* 채팅창 헤더 */}
      <div className="chat-box__header">
        <span>메시지</span>

        {/* 채팅창 닫기 버튼 */}
        <button
          type="button"
          onClick={toggleChatBox}
          className="chat-box__close-btn"
        >
          <CloseIcon fontSize="medium" />
        </button>
      </div>

      {/* 메시지 박스 */}
      <div className="chat-box__message-box" ref={messageBoxRef}>
        {messages.map((msg: any) => (
          <Message message={msg} />
        ))}
      </div>

      {/* 메시지 입력 폼 */}
      <form onSubmit={submitMessage} className="chat-box__form">
        <input type="text" className="chat-box__input" ref={messageRef} />
      </form>
    </div>
  );
};

export default ChatBox;
