import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CookieMessage from '../cookies'

describe('CookieMessage', () => {
  it('renders CookieMessage with cookie acceptance message', () => {
    const wrapper = shallow(<CookieMessage />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})