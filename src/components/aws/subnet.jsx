import React from 'react';
import ResourceStatus from "./resource/status";
import NetworkResourceDescription from './network_resource_description';
import Instance from './instance';

const Subnet = props => {
  const item = props.subnet
  const menuOptions = props.menuOptions
  const subnetSettings = menuOptions.subnet
  const instanceSettings = menuOptions.instance

  let instances = null;

  if (!instanceSettings.hide) {
    instances =
      props.resource.instances
        .filter((v, _) => v.subnet_id === item.id)
        .map((v, i) =>
          <Instance
            key={i}
            instance={v}
            resource={props.resource}
            updateResourceAttributes={props.updateResourceAttributes}
            settings={instanceSettings}
          />)
  }

  return (
    <div className="subnet clickable" onClick={(e) => props.updateResourceAttributes(e, "subnet", item.id)}>
      <ResourceStatus
        hide={subnetSettings.hideStatus}
        state={item.state}
      />
      <NetworkResourceDescription
        hideCidr={subnetSettings.hideCidr}
        hideId={subnetSettings.hideId}
        hasIcon={false}
        id={item.id}
        cidr={item.cidr}
      />
      {instances}
    </div>
  );
};

export default Subnet;
