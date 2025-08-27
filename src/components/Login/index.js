
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      name: '',
      showCreateUser: false,
      errorMessage: '',
      successMessage: '',
      redirectToHome: false,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      this.setState({ redirectToHome: true })
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleLogin = async e => {
    e.preventDefault()
    this.setState({ errorMessage: '' })
    const { email, password } = this.state
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5009'}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const result = await response.json()
      if (result.status === 'success') {
        const expiryDate = new Date()
        expiryDate.setHours(expiryDate.getHours() + 1)
        document.cookie = `jwt_token=${result.user_id}; expires=${expiryDate.toUTCString()}; path=/`
        localStorage.setItem('jwt_token', result.user_id)
        this.setState({ redirectToHome: true })
      } else {
        this.setState({ errorMessage: 'Invalid email or password' })
      }
    } catch (error) {
      this.setState({ errorMessage: 'Login error' })
    }
  }

  handleCreateUser = async e => {
    e.preventDefault()
    this.setState({ errorMessage: '', successMessage: '' })
    const { name, email, password } = this.state
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5009'}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })
      const text = await response.text()

      if (text.includes('already')) {
        this.setState({ errorMessage: 'Email or username already exists' })
      } else {
        this.setState({
          successMessage: 'User created successfully',
          showCreateUser: false,
          email: '',
          password: '',
          name: '',
        })
      }
    } catch (error) {
      this.setState({ errorMessage: 'User creation failed' })
    }
  }

  render() {
    const {
      email,
      password,
      name,
      showCreateUser,
      errorMessage,
      successMessage,
      redirectToHome,
    } = this.state

    if (redirectToHome) {
      return <Navigate to="/" />
    }

    return (
      <div>
        <h1>{showCreateUser ? 'Create User' : 'Login'}</h1>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        {showCreateUser ? (
          <form onSubmit={this.handleCreateUser}>
            <div>
              <label>Username: </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit">Create</button>
            <button type="button" onClick={() => this.setState({ showCreateUser: false })}>
              Cancel
            </button>
          </form>
        ) : (
          <form onSubmit={this.handleLogin}>
            <div>
              <label>Email: </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit">Login</button>
            <button type="button" onClick={() => this.setState({ showCreateUser: true })}>
              Create User
            </button>
          </form>
        )}
      </div>
    )
  }
}

export default Login
