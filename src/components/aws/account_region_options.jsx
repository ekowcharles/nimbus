import React from 'react';
import { excludeNull, onlyUnique } from '../utils/general';
const { JSONPath } = require('jsonpath-plus');

const AccountRegionOptions = props => {
  const isCurrentSelection = (accountId, region) => {
    const activeSelection = props.accountId + ":" + props.region
    const currentSelection = accountId + ":" + region

    return activeSelection === currentSelection
  }

  let accountRegionOptions = []

  const accountIds = JSONPath({
    path: "$.[*].account_id",
    json: props.resource || {}
  }).filter(excludeNull).filter(onlyUnique) || {}

  accountRegionOptions = accountIds.map((a, i) =>
    JSONPath({
      path: "$.[*].[?(@.account_id=" + a + ")].region",
      json: props.resource || {}
    }).filter(excludeNull).filter(onlyUnique).map((r, j) => {
      return (
        <div key={`${i}${j}`}>
          <input
            readOnly
            type="radio"
            checked={isCurrentSelection(a, r)}
            onClick={(e) => props.changeRegionSelection(e, a, r)}
          /> {a}: {r}
        </div>
      )
    })
  )

  if (accountRegionOptions.length === 0) {
    accountRegionOptions = <div className="empty">No options available yet.</div>
  }

  return (
    <div className="region input-group">
      <span className="option-title">Account-Region Selection</span>
      {accountRegionOptions}
    </div>
  )
};

export default AccountRegionOptions;
