// @flow

import blogService from '../services/blogs'

const reducer = (blogs : Array<Object> = [], action : Object) : Array<Object> => {
  switch (action.type) {
  case 'UPDATE_BLOG':
    const old : Array<Object> = blogs.filter(b => b._id !== action.blog._id)
    return [...old, action.blog ]
  case 'CREATE_BLOG':
    return [...blogs, action.blog ]
  case 'REMOVE_BLOG':
    return blogs.filter(b => b._id !== action.blog._id)
  case 'SET_BLOGS':
    return action.blogs
  default:
    return blogs
  }
}

export const updateBlog = (blog : Object) : Object => {
  return {
    type: 'UPDATE_BLOG',
    blog
  }
}

export const createBlog = (blog : Object) : Object => {
  return {
    type: 'CREATE_BLOG',
    blog
  }
}

export const removeBlog = (blog : Object) : Object => {
  return {
    type: 'REMOVE_BLOG',
    blog
  }
}

export const initBlogs = () : Function => {
  return async (d : Function) : Promise<Array<Object>> => {
    const blogs : Array<Object> = await blogService.getAll()
    d({
      type: 'SET_BLOGS',
      blogs
    })
    return blogs
  }
}

export const setBlogs = (blogs : Array<Object>) : Object => {
  return {
    type: 'SET_BLOGS',
    blogs
  }
}

export default reducer
