import React from 'react';
import MenuItem from '../menu/item';

const Menu = props => {
  const menu = props.menuOptions

  return (
    <div className="menu">
      <ul>
        <li className="dropdown">
          <span className="dropbtn">VPC</span>
          <div className="dropdown-content">
            <MenuItem
              label="Hide Icon"
              checked={menu.vpc.hideIcon}
              update={() => props.update("vpc", "hideIcon", menu.vpc.hideIcon)}
            />
            <MenuItem
              label="Hide Id"
              checked={menu.vpc.hideId}
              update={() => props.update("vpc", "hideId", menu.vpc.hideId)}
            />
            <MenuItem
              label="Hide Cidr"
              checked={menu.vpc.hideCidr}
              update={() => props.update("vpc", "hideCidr", menu.vpc.hideCidr)}
            />
            <MenuItem
              label="Hide Status"
              checked={menu.vpc.hideStatus}
              update={() => props.update("vpc", "hideStatus", menu.vpc.hideStatus)}
            />
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn">Subnet</span>
          <div className="dropdown-content">
            <MenuItem
              label="Hide Id"
              checked={menu.subnet.hideId}
              update={() => props.update("subnet", "hideId", menu.subnet.hideId)}
            />
            <MenuItem
              label="Hide Cidr"
              checked={menu.subnet.hideCidr}
              update={() => props.update("subnet", "hideCidr", menu.subnet.hideCidr)}
            />
            <MenuItem
              label="Hide Status"
              checked={menu.subnet.hideStatus}
              update={() => props.update("subnet", "hideStatus", menu.subnet.hideStatus)}
            />
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn">AZ</span>
          <div className="dropdown-content">
            <MenuItem
              label="Hide Name"
              checked={menu.az.hideName}
              update={() => props.update("az", "hideName", menu.az.hideName)}
            />
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn">Instance</span>
          <div className="dropdown-content">
            <MenuItem
              label="Hide"
              checked={menu.instance.hide}
              update={() => props.update("instance", "hide", menu.instance.hide)}
            />
            <MenuItem
              label="Hide Status"
              checked={menu.instance.hideStatus}
              update={() => props.update("instance", "hideStatus", menu.instance.hideStatus)}
            />
            <MenuItem
              label="Hide Type"
              checked={menu.instance.hideType}
              update={() => props.update("instance", "hideType", menu.instance.hideType)}
            />
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn">Database</span>
          <div className="dropdown-content">
            <MenuItem
              label="Hide"
              checked={menu.database.hide}
              update={() => props.update("database", "hide", menu.database.hide)}
            />
            <MenuItem
              label="Hide Name"
              checked={menu.database.hideName}
              update={() => props.update("database", "hideName", menu.database.hideName)}
            />
            <MenuItem
              label="Hide Status"
              checked={menu.database.hideStatus}
              update={() => props.update("database", "hideStatus", menu.database.hideStatus)}
            />
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn">Bucket</span>
          <div className="dropdown-content">
            <MenuItem
              label="Hide"
              checked={menu.bucket.hide}
              update={() => props.update("bucket", "hide", menu.bucket.hide)}
            />
            <MenuItem
              label="Hide Name"
              checked={menu.bucket.hideName}
              update={() => props.update("bucket", "hideName", menu.bucket.hideName)}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Menu;