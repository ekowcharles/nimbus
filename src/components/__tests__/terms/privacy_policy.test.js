import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PrivacyPolicy from '../../terms/privacy_policy'

describe('PrivacyPolicy', () => {
  it('renders privacy policy', () => {
    const wrapper = shallow(<PrivacyPolicy />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})