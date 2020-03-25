import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MenuItem from '../../../aws/menu/item'

describe('Menutem,', () => {
  it('renders menu item', () => {
    const wrapper = shallow(
      <MenuItem
        checked={false}
        label="Hide Status"
      // update={[Function]}
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})