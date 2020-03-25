import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ResourceAttributes from '../../../aws/resource/attributes'

describe('ResourceAttributes', () => {
  it('renders vpc or subnet description', () => {
    const wrapper = shallow(
      <ResourceAttributes
        resourceAttributes={
          {
            "foo": "bar",
            "list": ["one", "two"],
            "not": undefined
          }
        }
        detailsError={undefined}
      />
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})