import React from 'react';
import Vpc from './vpc';

const VpcList = props => {
  if (props.error !== undefined) {
    return <div className="message error">{props.error}</div>
  }

  const vpcs = props.resource.vpcs
    .filter((v, _) => v.account_id === props.accountId && v.region === props.region)
    .map(
      (v, i) => (
        <Vpc
          key={i}
          vpc={v}
          resource={props.resource}
          menuOptions={props.menuOptions}
          updateResourceAttributes={props.updateResourceAttributes}
        />
      )
    )

  return (
    <React.Fragment>
      {vpcs}
    </React.Fragment>
  );
};

export default VpcList;
