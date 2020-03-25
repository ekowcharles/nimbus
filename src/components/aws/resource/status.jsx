import React from 'react';

const ResourceStatus = props => {
  var status = ""
  if (!props.hide) {
    status = (
      <div className="res-status-tooltip">
        <div className={`res-status ${props.state}`} />
        <span className="text">{props.state}</span>
      </div>
    )
  }

  return (
    <React.Fragment>{status}</React.Fragment>
  );
};

export default ResourceStatus;
