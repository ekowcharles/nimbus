import React from 'react';
import ResourceStatus from "./status";

const Resource = props => {
  let status = null;
  if (props.state !== undefined && !props.hideStatus) {
    status = <ResourceStatus
      hide={props.hideStatus}
      state={props.state}
    />
  }

  let name = <span>{props.name}</span>;
  if (props.hideName) {
    name = null;
  }

  return (
    <div className="res-container clickable" onClick={(e) => props.updateResourceAttributes(e)}>
      {status}
      <img src={props.image} alt="resource" className="res-container-icon" />
      {name}
    </div>
  );
};

export default Resource;
