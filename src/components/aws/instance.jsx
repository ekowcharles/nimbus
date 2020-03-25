import React from 'react';

import imga1 from '../../images/aws/instances/a1.png'
import imgc3 from '../../images/aws/instances/c3.png'
import imgc4 from '../../images/aws/instances/c4.png'
import imgc5 from '../../images/aws/instances/c5.png'
import imgc5n from '../../images/aws/instances/c5n.png'
import imgd2 from '../../images/aws/instances/d2.png'
import imgdb from '../../images/aws/instances/db.png'
import imgf1 from '../../images/aws/instances/f1.png'
import imgg3 from '../../images/aws/instances/g3.png'
import imgh1 from '../../images/aws/instances/h1.png'
import imgi3 from '../../images/aws/instances/i3.png'
import imgin from '../../images/aws/instances/instance.png'
import imgm4 from '../../images/aws/instances/m4.png'
import imgm5 from '../../images/aws/instances/m5.png'
import imgm5a from '../../images/aws/instances/m5a.png'
import imgp2 from '../../images/aws/instances/p2.png'
import imgp3 from '../../images/aws/instances/p3.png'
import imgr4 from '../../images/aws/instances/r4.png'
import imgr5 from '../../images/aws/instances/r5.png'
import imgr5a from '../../images/aws/instances/r5a.png'
import imgt2 from '../../images/aws/instances/t2.png'
import imgt3 from '../../images/aws/instances/t3.png'
import imgt3a from '../../images/aws/instances/t3a.png'
import imgx1 from '../../images/aws/instances/x1.png'
import imgx1e from '../../images/aws/instances/x1e.png'
import imgz1d from '../../images/aws/instances/z1d.png'

import Resource from "./resource";

const images = {
  'a1': imga1,
  'c3': imgc3,
  'c4': imgc4,
  'c5': imgc5,
  'c5n': imgc5n,
  'd2': imgd2,
  'db': imgdb,
  'f1': imgf1,
  'g3': imgg3,
  'h1': imgh1,
  'i3': imgi3,
  'in': imgin,
  'm4': imgm4,
  'm5': imgm5,
  'm5a': imgm5a,
  'p2': imgp2,
  'p3': imgp3,
  'r4': imgr4,
  'r5': imgr5,
  'r5a': imgr5a,
  't2': imgt2,
  't3a': imgt3a,
  't3': imgt3,
  'x1': imgx1,
  'x1e': imgx1e,
  'z1d': imgz1d
}

const Instance = props => {
  const item = props.instance
  const typeParts = item.instance_type.split('.')
  const type = typeParts[0]
  const name = `...${item.id.substring(item.id.length, item.id.length - 6)}`
  const settings = props.settings
  const image = images[type] || imgin

  return (
    <Resource
      image={image}
      state={item.instance_state}
      hideName={settings.hideName}
      hideStatus={settings.hideStatus}
      name={name}
      updateResourceAttributes={(e) => props.updateResourceAttributes(e, "instance", item.id)}
    />
  );
};

export default Instance;
