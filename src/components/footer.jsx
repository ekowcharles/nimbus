import React from 'react';

const Footer = props => {
  return (
    <div className="area-footer smaller">
      &copy; Ovsprint LLC. &middot; All rights reserved
      <br />
      <br />
      <span
        className="clickable smallest pointer"
        onClick={() => props.loadPage('/terms-of-service')}
      >
        Terms of Service
      </span>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <span
        className="clickable smallest pointer"
        onClick={() => props.loadPage('/privacy-policy')}
      >
        Privacy Policy
      </span>
    </div>
  );
};

export default Footer;
