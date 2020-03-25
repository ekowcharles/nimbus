import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import DB from '../../aws/db'

describe('DB', () => {
  it('renders databases', () => {
    const wrapper = shallow(
      <DB
        db={
          {
            "account_id": "111111111111",
            "availability_zone": "us-east-1c",
            "id": "terraform-20200121195838741200000001",
            "region": "us-east-1",
            "status": "available",
          }
        }
        key="0"
        settings={
          {
            "hide": false,
            "hideName": false,
            "hideStatus": false,
          }
        }
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})