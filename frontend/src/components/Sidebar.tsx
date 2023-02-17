import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { SidebarItem, SidebarProps } from '../types/SidebarType';

const Sidebar = ({ items, onSidebarClick }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul>
        {items.map((item: SidebarItem) => (
          <li key={item.name}>
            <button
              type="button"
              className={`sidebar__item ${
                location.pathname === item.path ? `sidebar__selected` : ''
              }`}
              onClick={() => {
                onSidebarClick(item.name);
                navigate(item.path);
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
