import React from 'react';
import Resource from "./resource";
import { excludeNull, nullify } from '../utils/general';

const GeneralResourceList = props => {
  let views = props.details.map((detail, i) => {
    let groupView = detail.groups.map((group, j) => {
      let resources = props.resource[group.key]
      if (props.regional) {
        resources = resources.filter((r, _) =>
          (r.account_id === props.accountId) && (r.region === props.region || r.region === undefined)
        )
      }

      if (resources.length === 0) {
        return null
      }

      const groupItemView = resources.map((item, k) => {
        const name = item[group.displayField];

        return (
          <Resource
            key={k}
            image={group.image}
            state={item.status}
            hideName={false}
            hideStatus={false}
            name={name}
            updateResourceAttributes={(e) => props.updateResourceAttributes(e, "", item[group.keyField])}
          />
        )
      })

      return (
        <div key={j} className="general-resources-group">{groupItemView}</div>
      )
    })

    groupView = nullify(groupView.filter(excludeNull))
    if (groupView === null) {
      return null
    }

    return (
      <div key={i} className="general-resources">
        <div className="title">{detail.title}</div>
        {groupView}
      </div>
    )
  })

  return nullify(views.filter(excludeNull))
};

export default GeneralResourceList;
