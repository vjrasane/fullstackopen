import React from 'react'
// import jest from 'jest-mock'
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom'
import Blog from '../../components/Blog'

describe('<Blog />', () => {
  let blogObj

  beforeEach(() => {
    blogObj = {
      title: 'Simple blog title',
      author: 'Teppo Testaaja',
      url: 'http://test.url.com',
      user: 'Teppo Testaaja',
      likes: 42
    }
  })

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <Blog
            blog={blogObj}/>
        </Router>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
