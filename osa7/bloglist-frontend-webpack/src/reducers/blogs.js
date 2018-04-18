import blogService from '../services/blogs'

const reducer = (blogs = [], action) => {
  let old

  switch (action.type) {
  case 'LIKE_BLOG':
    old = blogs.filter(b => b._id !== action.blog._id)
    const liked = blogs.find(b => b._id === action.blog._id)

    return [...old, { ...liked, likes: liked.likes + 1 }]
  case 'COMMENT_BLOG':
    old = blogs.filter(b => b._id !== action.data.blog)
    const commented = blogs.find(b => b._id === action.data.blog)

    return [...old, { ...commented, comments: [...commented.comments, action.data] }]
  case 'CREATE_BLOG':
    return [...blogs, action.data ]
  case 'REMOVE_BLOG':
    return blogs.filter(b => b._id !== action.blog.id)
  case 'INIT_BLOGS':
    return action.data
  default:
    return blogs
  }
}


export const likeBlog = (blog) => {
  return async (d) => {
    await blogService.update(blog._id, { ...blog, likes: blog.likes + 1 })
    d({
      type: 'LIKE_BLOG',
      blog
    })
  }
}

export const removeBlog = (blog) => {
  return async (d) => {
    await blogService.remove(blog._id)
    d({
      type: 'REMOVE_BLOG',
      blog
    })
  }
}

export const commentBlog = (comment) => {
  return async (d) => {
    const data = await blogService.comment(comment.blog, comment)
    d({
      type: 'COMMENT_BLOG',
      data
    })
  }
}

export const createBlog = (blog) => {
  return async (d) => {
    const data = await blogService.create(blog)
    d({
      type: 'CREATE_BLOG',
      data
    })
  }
}

export const initBlogs = () => {
  return async (d) => {
    const data = await blogService.getAll()
    d({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export default reducer
