import React from 'react';
import iconImg from '../images/icon.png';

const Header = props => {
  return (
    <div className="area-header">
      <img src={iconImg} alt="nimbus-icon" className="nimbus-icon" /> nimbus
    </div>
  );
};

export default Header;
