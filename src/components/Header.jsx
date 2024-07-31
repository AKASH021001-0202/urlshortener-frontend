// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    < div className='bg-dark text-white ' style={{display:'flex',justifyContent :'space-around', alignItems:'center', height:'60px'}}>
    <Link className="navbar-brand" to="/">URL SHORTNER</Link>
    <nav className="navbar navbar-expand-lg  jus navbar-dark bg-dark">
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/chart">Chart</Link>
          </li>
          {token ? (
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
    </div>
  );
};

export default Header;
