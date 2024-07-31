// Dashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import ChartPage from './ChartPage';
import ViewUrlsPage from './ViewUrlsPage';


const Dashboard = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
  };

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={handleLogout} />
      <div className="content">
        <Routes>
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/url" element={<ViewUrlsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
