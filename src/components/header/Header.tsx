import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import RememberItLogo from '../../assets/logos/RememberItLogo.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <img
        src={RememberItLogo}
        alt="RememberIt Logo"
        className="header-logo"
        onClick={() => window.location.assign('/cards')}
      />
      <nav className="nav">
        <Link to="/profile" className="link">
          Profile
        </Link>
      </nav>
    </header>
  );
};

export default Header;
