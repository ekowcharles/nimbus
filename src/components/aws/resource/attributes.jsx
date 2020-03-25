import React from 'react';
import { htmlDecode, build } from "../../utils/general";

const ResourceAttributes = props => {
  if (props.detailsError !== undefined) {
    return <div className="message error">{props.detailsError}</div>
  }

  if (props.resourceAttributes === undefined) {
    return null
  }

  let content = htmlDecode(build(props.resourceAttributes).join('').replace(/t;,&/g, 't;&'))

  return (
    <div className="attributes">
      <div className="details-dropdown" onClick={() => props.toggleAttributesCollapsedClass()}>
        <div className={props.attributesCollapsed ? "arrow left" : "arrow right"}></div>
      </div>
      <div className={props.attributesCollapsed ? "details collapsed" : "details"}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default ResourceAttributes;
