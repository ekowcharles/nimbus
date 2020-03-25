import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Instance from '../../aws/instance'

describe('Instance', () => {
  it('renders Instances', () => {
    const wrapper = shallow(
      <Instance
        instance={
          {
            "account_id": "111111111111",
            "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-07fed2eeedfa37fed",
            "availability_zone": "us-east-1c",
            "id": "i-07fed2eeedfa37fed",
            "instance_state": "running",
            "instance_type": "t2.micro",
            "region": "us-east-1",
            "subnet_id": "subnet-44444444444444444",
          }
        }
        key="0"
        resource={
          {
            "accessanalyzer_analyzers": [
              {
                "account_id": "111111111111",
                "id": "id",
                "region": "us-east-1",
              },
            ],
            "amis": [
              {
                "id": "ami-000b3a073fc20e415",
              },
            ],
            "buckets": [
              {
                "name": "nimbusmain",
                "region": "us-east-1",
              },
            ],
            "certificate_authorities": [
              {
                "account_id": "111111111111",
                "id": "arn",
                "region": "us-east-1",
                "status": "status",
              },
            ],
            "certificates": [
              {
                "account_id": "111111111111",
                "id": "domain_name",
                "region": "us-east-1",
              },
            ],
            "db_instances": [
              {
                "account_id": "111111111111",
                "availability_zone": "us-east-1c",
                "id": "terraform-20200121195838741200000001",
                "region": "us-east-1",
                "status": "available",
              },
            ],
            "instances": [
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-07fed2eeedfa37fed",
                "availability_zone": "us-east-1c",
                "id": "i-07fed2eeedfa37fed",
                "instance_state": "running",
                "instance_type": "t2.micro",
                "region": "us-east-1",
                "subnet_id": "subnet-44444444444444444",
              },
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-88888888888888888",
                "availability_zone": "us-east-1c",
                "id": "i-88888888888888888",
                "instance_state": "running",
                "instance_type": "t2.micro",
                "region": "us-east-1",
                "subnet_id": "subnet-44444444444444444",
              },
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:instance/i-66666666666666666",
                "availability_zone": "us-east-1d",
                "id": "i-66666666666666666",
                "instance_state": "running",
                "instance_type": "t2.micro",
                "region": "us-east-1",
                "subnet_id": "subnet-33333333333333333",
              },
            ],
            "subnets": [
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:subnet/subnet-44444444444444444",
                "availability_zone": "us-east-1c",
                "cidr": "10.0.1.0/24",
                "id": "subnet-44444444444444444",
                "region": "us-east-1",
                "vpc_id": "vpc-22222222222222222",
              },
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:subnet/subnet-33333333333333333",
                "availability_zone": "us-east-1d",
                "cidr": "10.0.2.0/24",
                "id": "subnet-33333333333333333",
                "region": "us-east-1",
                "vpc_id": "vpc-22222222222222222",
              },
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:subnet/subnet-55555555555555555",
                "availability_zone": "us-east-1e",
                "cidr": "10.0.3.0/24",
                "id": "subnet-55555555555555555",
                "region": "us-east-1",
                "vpc_id": "vpc-22222222222222222",
              },
            ],
            "vpcs": [
              {
                "account_id": "111111111111",
                "arn": "arn:aws:ec2:us-east-1:111111111111:vpc/vpc-222222222222222222",
                "cidr": "10.0.0.0/16",
                "id": "vpc-22222222222222222",
                "region": "us-east-1",
              },
            ],
          }
        }
        settings={
          {
            "hide": false,
            "hideStatus": false,
            "hideType": false,
          }
        }
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})