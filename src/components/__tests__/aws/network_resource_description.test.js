import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NetworkResourceDescription from '../../aws/network_resource_description'

describe('NetworkResourceDescription', () => {
  it('renders vpc or subnet description', () => {
    const wrapper = shallow(
      <NetworkResourceDescription
        cidr="10.0.1.0/24"
        hasIcon={false}
        hideCidr={false}
        hideId={false}
        id="subnet-44444444444444444"
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})