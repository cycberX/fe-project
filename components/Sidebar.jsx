// components/Sidebar.js

import React, { useState } from 'react';
import { FaHome, FaUser, FaCog, FaBars } from 'react-icons/fa'; // Import some icons

export function Sidebar () {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Sidebar Button for Mobile */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h5>Logo</h5>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="/">
              <FaHome /> Home
            </a>
          </li>
          <li>
            <a href="/admin/applications">
              <FaHome /> Applications
            </a>
          </li>
          <li>
            <a href="/admin/media">
              <FaHome /> Media
            </a>
          </li>
          <li>
            <a href="/dashboard">
              <FaUser /> Dashboard
            </a>
          </li>
          <li>
            <a href="/settings">
              <FaCog /> Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
