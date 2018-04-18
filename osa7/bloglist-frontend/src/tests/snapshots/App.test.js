import React from 'react'
import renderer from 'react-test-renderer'
import ProvidedApp from '../../ProvidedApp'

describe.only('<ProvidedApp />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ProvidedApp/>).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
