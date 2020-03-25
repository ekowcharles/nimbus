import React from 'react';
import dbImg from '../../images/aws/db.png';
import Resource from "./resource";

const DB = props => {
  const item = props.db
  const settings = props.settings
  const name = `...${item.id.substring(item.id.length, item.id.length - 6)}`

  return (
    <Resource
      image={dbImg}
      state={item.status}
      hideName={settings.hideName}
      hideStatus={settings.hideStatus}
      name={name}
      updateResourceAttributes={(e) => props.updateResourceAttributes(e, "db", item.id)}
    />
  );
};

export default DB;
