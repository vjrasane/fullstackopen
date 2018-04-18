import React from 'react'
// import jest from 'jest-mock'
import { mount } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blog
  let likeSink
  let removeSink


  beforeEach(() => {
    const blogObj = {
      title: 'Simple blog title',
      author: 'Teppo Testaaja',
      url: 'http://test.url.com',
      user: 'Teppo Testaaja',
      likes: 42
    }
    likeSink = jest.fn()
    removeSink = jest.fn()
    blog = mount(<Blog blog={blogObj} like={likeSink} remove={removeSink} username={blogObj.user}/>)
  })

  it('at start the details are not displayed', () => {
    const div = blog.find('.expandable')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking name the details are displayed', () => {
    const titleDiv = blog.find('.title')
    titleDiv.simulate('click')

    const div = blog.find('.expandable')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })

  it('after clicking the name twice the details are not displayed', () => {
    const titleDiv = blog.find('.title')
    titleDiv.simulate('click')
    titleDiv.simulate('click')

    const div = blog.find('.expandable')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })
})
