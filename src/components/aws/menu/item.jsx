import React from 'react';

const MenuItem = props => {
  return (
    <div onClick={() => props.update()}>
      <input
        readOnly
        type="checkbox"
        checked={props.checked}
      />
      <span>{props.label}</span>
    </div>
  );
};

export default MenuItem;