import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import VpcList from '../../aws/vpc_list'

const resource = {
  "vpcs": [
    {
      "id": "vpc-22222222222222222",
      "arn": "arn:aws:ec2:us-east-1:111111111111:vpc/vpc-222222222222222222",
      "account_id": "111111111111",
      "region": "us-east-1",
      "cidr": "10.0.0.0/16"
    }
  ],
  "subnets": [
    {
      "id": "subnet-44444444444444444",
      "arn": "arn:aws:ec2:us-east-1:111111111111:subnet/subnet-44444444444444444",
      "vpc_id": "vpc-22222222222222222",
      "account_id": "111111111111",
      "region": "us-east-1",
      "availability_zone": "us-east-1c",
      "cidr": "10.0.1.0/24"
    },
    {
      "id": "subnet-33333333333333333",
      "arn": "arn:aws:ec2:us-east-1:111111111111:subnet/subnet-33333333333333333",
      "vpc_id": "vpc-22222222222222222",
      "account_id": "111111111111",
      "region": "us-east-1",
      "availability_zone": "us-east-1d",
      "cidr": "10.0.2.0/24"
    },
    {
      "id": "subnet-55555555555555555",
      "arn": "arn:aws:ec2:us-east-1:111111111111:subnet/subnet-55555555555555555",
      "vpc_id": "vpc-22222222222222222",
      "account_id": "111111111111",
      "region": "us-east-1",
      "availability_zone": "us-east-1e",
      "cidr": "10.0.3.0/24"
    }
  ],
  "instances": [
    {
      "id": "i-07fed2eeedfa37fed",
      "account_id": "111111111111",
      "region": "us-east-1",
      "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-07fed2eeedfa37fed",
      "instance_state": "running",
      "instance_type": "t2.micro",
      "availability_zone": "us-east-1c",
      "subnet_id": "subnet-44444444444444444"
    },
    {
      "id": "i-88888888888888888",
      "account_id": "111111111111",
      "region": "us-east-1",
      "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-88888888888888888",
      "instance_state": "running",
      "instance_type": "t2.micro",
      "availability_zone": "us-east-1c",
      "subnet_id": "subnet-44444444444444444"
    },
    {
      "id": "i-66666666666666666",
      "account_id": "111111111111",
      "region": "us-east-1",
      "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-66666666666666666",
      "instance_state": "running",
      "instance_type": "t2.micro",
      "availability_zone": "us-east-1d",
      "subnet_id": "subnet-33333333333333333"
    }
  ],
  "buckets": [{ "name": "nimbusmain", "region": "us-east-1" }],
  "db_instances": [
    {
      "id": "terraform-20200121195838741200000001",
      "account_id": "111111111111",
      "region": "us-east-1",
      "availability_zone": "us-east-1c",
      "status": "available"
    }
  ],
  "amis": [{ "id": "ami-000b3a073fc20e415" }],
  "accessanalyzer_analyzers": [
    {
      "id": "id",
      "account_id": "111111111111",
      "region": "us-east-1"
    }
  ],
  "certificates": [
    {
      "id": "domain_name",
      "account_id": "111111111111",
      "region": "us-east-1"
    }
  ],
  "certificate_authorities": [
    {
      "id": "arn",
      "account_id": "111111111111",
      "region": "us-east-1",
      "status": "status"
    }
  ]
}

const menuOptions = {
  vpc: {
    hideId: false,
    hideCidr: false,
    hideStatus: false,
    hideIcon: false
  },
  subnet: {
    hideId: false,
    hideCidr: false,
    hideStatus: false
  },
  az: {
    hideName: false
  },
  instance: {
    hide: false,
    hideType: false,
    hideStatus: false
  },
  database: {
    hide: false,
    hideName: false,
    hideStatus: false
  },
  bucket: {
    hide: false,
    hideName: false,
  }
}

describe('VpcList', () => {
  it('renders a list of vpcs', () => {
    const wrapper = shallow(
      <VpcList
        accountId="111111111111"
        menuOptions={menuOptions}
        region="us-east-1"
        resource={resource}
      // updateResourceAttributes={[Function]}
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})