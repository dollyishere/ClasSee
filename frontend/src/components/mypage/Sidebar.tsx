import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button
            type="button"
            className={`sidebar__item ${
              location.pathname === '/mypage' ? 'sidebar__selected' : ''
            }`}
            onClick={() => navigate('/mypage')}
          >
            내정보
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__item ${
              location.pathname === '/mypage/created-lesson'
                ? 'sidebar__selected'
                : ''
            }`}
            onClick={() => navigate('/mypage/created-lesson')}
          >
            개설한 클래스
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__item ${
              location.pathname === '/mypage/applied-lesson'
                ? 'sidebar__selected'
                : ''
            }`}
            onClick={() => navigate('/mypage/applied-lesson')}
          >
            신청한 클래스
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__item ${
              location.pathname === '/mypage/bookmark'
                ? 'sidebar__selected'
                : ''
            }`}
            onClick={() => navigate('/mypage/bookmark')}
          >
            북마크
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__item ${
              location.pathname === '/mypage/photo-book'
                ? 'sidebar__selected'
                : ''
            }`}
            onClick={() => navigate('/mypage/photo-book')}
          >
            포토북
          </button>
        </li>
        <li>
          <button
            type="button"
            className={`sidebar__item ${
              location.pathname === '/mypage/review' ? 'sidebar__selected' : ''
            }`}
            onClick={() => navigate('/mypage/review')}
          >
            작성한 후기
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
