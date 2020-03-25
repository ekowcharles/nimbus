import React from 'react';
import vpcImg from '../../images/aws/vpc.png';
import ResourceStatus from "./resource/status";
import NetworkResourceDescription from './network_resource_description';
import Az from "./az"
import { onlyUnique } from '../utils/general'

const Vpc = props => {
  const item = props.vpc
  const menuOptions = props.menuOptions
  const vpcSettings = menuOptions.vpc

  const vpcAzs = props.resource.subnets
    .filter((v, _) => v.vpc_id === item.id)
    .map((v, _) => {
      return { "name": v.availability_zone }
    }).filter(onlyUnique)

  let azs = (vpcAzs || []).map(
    (v, i) => (
      <Az
        key={i}
        vpc_id={item.id}
        az={v}
        resource={props.resource}
        menuOptions={menuOptions}
        updateResourceAttributes={props.updateResourceAttributes}
      />
    )
  )

  let visibilityClassName = ""
  if (vpcSettings.hideIcon) {
    visibilityClassName = "gone"
  }

  return (
    <div className="vpc clickable" onClick={(e) => props.updateResourceAttributes(e, "vpc", item.id)}>
      <ResourceStatus
        hide={vpcSettings.hideStatus}
        state={item.state}
      />
      <img src={vpcImg} alt="vpc" className={`res-icon ${visibilityClassName} `} />
      <NetworkResourceDescription
        hideCidr={vpcSettings.hideCidr}
        hideId={vpcSettings.hideId}
        hasIcon={!vpcSettings.hideIcon}
        id={item.id}
        cidr={item.cidr}
      />
      <div className="vpc-az">
        {azs}
      </div>
    </div>
  );
};

export default Vpc;
