import userService from '../services/users'

const reducer = (users = [], action) => {
  // let user, others

  switch (action.type) {
  case 'CREATE_USER':
    return [...users, action.data ]
  case 'INIT_USERS':
    return action.data
  // case 'CREATE_BLOG':
  //   user = users.find(u => u.id === action.data.user)
  //   others = users.filter(u => u.id !== action.data.user)
  //   return [...others, { user, blogs: [...user.blogs, action.data] }]
  // case 'REMOVE_BLOG':
  //   user = users.find(u => u.id === action.blog.user)
  //   others = users.filter(u => u.id !== action.blog.user)
  //   return [...others, { user, blogs: user.blogs.filter(b => b._id !== action.blog._id) }]
  // case 'LIKE_BLOG':
  //   user = users.find(u => u.id === action.blog.user._id)
  //   others = users.filter(u => u.id !== action.blog.user._id)
  //
  //   const old = user.blogs.filter(b => b._id !== action.blog._id)
  //   const liked = user.blogs.find(b => b._id === action.blog._id)
  //
  //   return [...others, { ...user, blogs: [...old, { ...liked, likes: liked.likes + 1 }] }]
  default:
    return users
  }
}

export const createUser = (user) => {
  return async (d) => {
    const data = await userService.create(user)
    d({
      type: 'CREATE_USER',
      data
    })
  }
}

export const initUsers = () => {
  return async (d) => {
    const data = await userService.getAll()
    d({
      type: 'INIT_USERS',
      data
    })
  }
}

export default reducer
