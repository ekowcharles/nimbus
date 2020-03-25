import React from 'react';
import AccountRegionOptions from './account_region_options';

const InfraInput = props => {
  const tfstateViewType = "tfstate"
  const nimbusViewType = "nimbusSchema"

  let placeholder = "Paste contents of terraform state file here"
  if (props.viewType === nimbusViewType) {
    placeholder = "Paste nimbus schema here"
  }

  return (
    <React.Fragment>
      <div className={props.inputCollapsed ? "state collapsed" : "state"} >
        <div className="text">
          <span className="option-title">Input</span>
          <div className="radio-item">
            <input
              type="radio"
              id={tfstateViewType}
              value={tfstateViewType}
              checked={props.viewType === tfstateViewType}
              onChange={() => props.updateViewType(tfstateViewType)} /> <span>Terraform State</span>
          </div>
          <div className="radio-item">
            <input
              type="radio"
              id={nimbusViewType}
              value={nimbusViewType}
              checked={props.viewType === nimbusViewType}
              onChange={() => props.updateViewType(nimbusViewType)} /> <span>Nimbus Schema</span>
          </div>
          <textarea
            placeholder={placeholder}
            wrap="false"
            value={JSON.stringify(props.numbusInput)}
            onChange={(e) => props.setResource(e.target.value)} />
        </div>
        <AccountRegionOptions
          resource={props.resource}
          changeRegionSelection={props.changeRegionSelection}
          accountId={props.accountId}
          region={props.region}
        />
      </div>
      <div className="input-dropdown" onClick={() => props.toggleInputCollapsedClass()}>
        <div className={props.inputCollapsed ? "arrow down" : "arrow up"}></div>
      </div>
    </React.Fragment>
  );
};

export default InfraInput;