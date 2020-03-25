import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Resource from '../../../aws/resource/index'

describe('Resource', () => {
  it('renders resources', () => {
    const wrapper = shallow(
      <Resource
        hideName={false}
        hideStatus={false}
        image="db.png"
        name="...000001"
        state="available"
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})