import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Header from '../header'

describe('Header', () => {
  it('renders header with correct title', () => {
    const wrapper = shallow(<Header />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})