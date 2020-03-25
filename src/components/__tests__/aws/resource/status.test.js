import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ResourceStatus from '../../../aws/resource/status'

describe('ResourceStatus', () => {
  it('renders status or resource', () => {
    const wrapper = shallow(
      <ResourceStatus
        hide={false}
        state="available"
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})