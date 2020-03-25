import React from 'react';

const NetworkResourceDescription = props => {
  var description = props.id + " | " + props.cidr
  if (props.hideId && props.hideCidr) {
    description = ""
  } else if (props.hideId) {
    description = props.cidr
  } else if (props.hideCidr) {
    description = props.id
  }

  var noIconClassName = "no-res-icon"
  if (props.hasIcon) {
    noIconClassName = ""
  }

  return (
    <div className={`res-desc desc ${noIconClassName}`}>{description}</div>
  );
};

export default NetworkResourceDescription;
