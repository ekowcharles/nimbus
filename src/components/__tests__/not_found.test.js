import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotFound from '../not_found'

describe('NotFound', () => {
  it('renders page with correct message when route is not found', () => {
    const wrapper = shallow(<NotFound />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})