import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Footer from '../footer'

describe('Footer', () => {
  it('renders footer with terms of service and privacy information', () => {
    const wrapper = shallow(<Footer />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})