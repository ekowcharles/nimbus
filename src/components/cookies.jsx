import React from 'react';

const CookieMessage = props => {
  return (
    <div className="cookies">
      <div className="cookie">
        <p className="smallest">
          This website stores cookies on your computer. These cookies allow us
          to remember you so you dont have to login each time you visit our
          website.
        </p>
        <p className="smallest">
          If you decline, we wont be able to remember you and you will have to
          login each time you need to access your personal data. A single cookie
          will be used in your browser to remember your preference not to be
          tracked.
        </p>
        <div
          className="cookie-action smaller pointer"
          onClick={e => props.acceptCookie(e)}
        >
          Accept
        </div>
        <div
          className="cookie-action smaller pointer"
          onClick={e => props.rejectCookie(e)}
        >
          Reject
        </div>
      </div>
    </div>
  );
};

export default CookieMessage;
