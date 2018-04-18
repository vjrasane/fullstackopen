import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import LoginView from './components/LoginView'
import UserInfoView from './components/UserInfoView'
// import jest from 'jest-mock'

jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('login view is rendered and contains inputs', () => {
      app.update()
      const loginView = app.find(LoginView)
      expect(loginView.exists()).toBeTruthy() // loginview found

      const usernameInput = loginView.find('.inputrow.username')
      const passwordInput = loginView.find('.inputrow.password')
      const loginButton = loginView.find('.button.login')

      expect(usernameInput.text()).toBe('Username:')
      expect(passwordInput.text()).toBe('Password:')
      expect(loginButton.text()).toBe('Login')
    })

    it('blog view is not rendered', () => {
      app.update()
      expect(app.find(BlogView).exists()).toBeFalsy() // blogview not found
    })
  })

  describe('when user is logged in', () => {
    const user = {
      username: 'Teppo Testaaja',
      password: 'salakala',
      token: '123123123'
    }

    beforeEach(() => {
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      app = mount(<App />)
    })

    it('login view is not rendered', () => {
      app.update()
      expect(app.find(LoginView).exists()).toBeFalsy() // loginview not found
    })

    it('user info view is rendered and contains info', () => {
      app.update()
      const userInfoView = app.find(UserInfoView)
      expect(userInfoView.exists()).toBeTruthy() // userinfoview found

      const infoDiv = userInfoView.find('.userInfo')
      const logoutButton = userInfoView.find('.button.logout')

      expect(infoDiv.text()).toContain(user.username + ' logged in ')
      expect(logoutButton.text()).toBe('Logout')
    })

    it('blog view is rendered and contains all blogs', () => {
      app.update()
      const blogView = app.find(BlogView)
      expect(blogView.exists()).toBeTruthy() // blogview found

      const blogs = app.find(Blog)
      expect(blogs.length).toEqual(blogService.blogs.length)
    })
  })

})
