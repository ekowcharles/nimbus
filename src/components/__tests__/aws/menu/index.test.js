import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Menu from '../../../aws/menu/index'

const menuOptions = {
  "az": {
    "hideName": false,
  },
  "bucket": {
    "hide": false,
    "hideName": false,
  },
  "database": {
    "hide": false,
    "hideName": false,
    "hideStatus": false,
  },
  "instance": {
    "hide": false,
    "hideStatus": false,
    "hideType": false,
  },
  "subnet": {
    "hideCidr": false,
    "hideId": false,
    "hideStatus": false,
  },
  "vpc": {
    "hideCidr": false,
    "hideIcon": false,
    "hideId": false,
    "hideStatus": false,
  },
}

describe('Menu', () => {
  it('renders menu', () => {
    const wrapper = shallow(
      <Menu
        menuOptions={menuOptions}
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})