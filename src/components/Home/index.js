
import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Header from '../Header'

function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate()
    return <Component {...props} navigate={navigate} />
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectToLogin: false,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt_token')
    if (!token) {
      this.setState({ redirectToLogin: true })
    }
  }

  handleGetUserById = () => {
    this.props.navigate('/get-user-by-id')
  }

  handleSearchUserByName = () => {
    this.props.navigate('/search-user-by-name')
  }

  render() {
    const { redirectToLogin } = this.state

    if (redirectToLogin) {
      return <Navigate to="/login" />
    }

    return (
      <div>
        <Header />
        <h1>Welcome to Home</h1>
        <div style={{ marginTop: '20px' }}>
          <button onClick={this.handleGetUserById}>Get User by ID</button>
          <button onClick={this.handleSearchUserByName}>Search User by Name</button>
        </div>
      </div>
    )
  }
}

export default withNavigation(Home)
