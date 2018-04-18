import React from 'react'
// import jest from 'jest-mock'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders blog', () => {
    const blog = {
      title: 'Simple blog title',
      author: 'Teppo Testaaja',
      likes: 42
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const infoDiv = blogComponent.find('.blog_info')

    expect(infoDiv.text()).toBe(`${blog.title} ${blog.author}`)

    const detailDiv = blogComponent.find('.blog_details')
    expect(detailDiv.text()).toContain(`blog has ${blog.likes} likes`)
  })

  it('clicking like twice calls event handler twice', () => {
    const blog = {
      title: 'Simple blog title',
      author: 'Teppo Testaaja',
      likes: 42
    }

    const mockHandler = jest.fn()

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler}/>)

    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
