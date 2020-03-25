import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import TermsOfService from '../../terms/terms_of_service'

describe('TermsOfService', () => {
  it('renders terms of service', () => {
    const wrapper = shallow(<TermsOfService />)

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})