import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Bucket from '../../aws/bucket'

describe('Bucket', () => {
  it('renders databases', () => {
    const wrapper = shallow(
      <Bucket
        bucket={
          {
            "name": "nimbusmain",
            "region": "us-east-1"
          }
        }
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