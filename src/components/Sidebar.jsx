// Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaChartBar, FaLink, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/chart"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FaChartBar /> Chart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/url"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              <FaLink /> View URLs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
            
            >
              <FaLink /> Create Short Url 
            </NavLink>
          </li>
          <li>
            <button onClick={onLogout} className="logout-button">
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
