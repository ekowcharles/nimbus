import React from 'react';
import Subnet from "./subnet"
import DB from './db';

const Az = props => {
  const azSettings = props.menuOptions.az
  const subnets = props.resource.subnets.filter((v, _) => v.availability_zone === props.az.name && v.vpc_id === props.vpc_id)

  var name = ""
  if (!azSettings.hideName) {
    name = <div className="az-desc desc">{props.az.name}</div>
  }

  const subnetList = subnets.map(
    (s, i) => (
      <Subnet
        key={i}
        vpc_id={props.vpc_id}
        availability_zone={props.az.name}
        resource={props.resource}
        subnet={s}
        menuOptions={props.menuOptions}
        updateResourceAttributes={props.updateResourceAttributes}
      />
    )
  )

  const databaseSettings = props.menuOptions.database
  let dbs = null;

  if (databaseSettings.hide !== true) {
    dbs = props.resource.db_instances
      .filter((v, _) => v.availability_zone === props.az.name)
      .map((v, i) =>
        <DB
          key={i}
          db={v}
          updateResourceAttributes={props.updateResourceAttributes}
          settings={databaseSettings}
        />
      )
  }

  return (
    <div className="az" onClick={(e) => { props.updateResourceAttributes(e, "subnet", "nothing") }}>
      {name}
      <div className="az-subnet">
        {subnetList}
      </div>
      {dbs}
    </div>
  );
};

export default Az;
