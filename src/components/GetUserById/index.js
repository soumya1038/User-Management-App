// import React, { Component } from 'react'
// import Header from '../Header'

// class GetUserById extends Component {
//   state = {
//     userId: '',
//     user: null,
//     error: '',
//   }

//   handleChange = event => {
//     this.setState({ userId: event.target.value })
//   }

//   handleSubmit = async () => {
//     const { userId } = this.state

//     try {
//       const response = await fetch(`http://localhost:5009/user/${userId}`)
//       const data = await response.text()

//       if (data.includes('User not found')) {
//         this.setState({ error: 'User not found', user: null })
//       } else {
//         this.setState({ user: data, error: '' })
//       }
//     } catch (error) {
//       this.setState({ error: 'Failed to fetch user', user: null })
//     }
//   }

//   render() {
//     const { userId, user, error } = this.state

//     return (
//       <div>
//         <Header />
//         <h1>Get User By ID</h1>
//         <input
//           type="text"
//           placeholder="Enter User ID"
//           value={userId}
//           onChange={this.handleChange}
//         />
//         <button onClick={this.handleSubmit}>Search</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         {user && <p>User: {user}</p>}
//       </div>
//     )
//   }
// }

// export default GetUserById




/////////////////////////////////////////////////////////////////////////////////





// // src/components/GetUserById/index.js
// import { Component } from 'react'
// import { Navigate } from 'react-router-dom'
// import Header from '../Header'

// class GetUserById extends Component {
//   state = {
//     userId: '',
//     userData: null,
//     errorMsg: '',
//     redirect: false,
//     name: '',
//     email: '',
//     updateMessage: '',
//   }

//   handleChange = event => {
//     this.setState({ userId: event.target.value })
//   }

//   fetchUser = async () => {
//     const { userId } = this.state
//     try {
//       const response = await fetch(`http://localhost:5009/user/${userId}`)
//       if (!response.ok) {
//         throw new Error('User not found')
//       }
//       const data = await response.json()
//       this.setState({ userData: data, errorMsg: '', name: data.name, email: data.email, updateMessage: '' })
//     } catch (error) {
//       this.setState({ userData: null, errorMsg: error.message, updateMessage: '' })
//     }
//   }

//   handleDelete = async () => {
//     const { userId } = this.state
//     try {
//       const response = await fetch(`http://localhost:5009/user/${userId}`, {
//         method: 'DELETE',
//       })
//       if (response.ok) {
//         alert('User deleted successfully!')
//         this.setState({ redirect: true })
//       } else {
//         alert('Failed to delete user.')
//       }
//     } catch (error) {
//       alert('Error deleting user.')
//     }
//   }

//   handleDelete = async () => {
//   const { userId } = this.state
//   try {
//     const response = await fetch(`http://localhost:5009/user/${userId}`, {
//       method: 'DELETE',
//     })
//     if (response.ok) {
//       alert('User deleted successfully!')
//       // Simulate logout
//       localStorage.removeItem('jwt_token')
//       this.setState({ redirect: true })
//     } else {
//       alert('Failed to delete user.')
//     }
//   } catch (error) {
//     alert('Error deleting user.')
//   }
// }


//   renderUserInfo = () => {
//     const { userData, name, email, updateMessage } = this.state
//     return (
//       <div style={{ marginTop: '20px' }}>
//         <h3>User Details</h3>
//         <p><strong>ID:</strong> {userData.id}</p>
//         <label>
//           <strong>Name:</strong>
//           <input
//             type="text"
//             value={name}
//             onChange={e => this.setState({ name: e.target.value })}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//         <br />
//         <label>
//           <strong>Email:</strong>
//           <input
//             type="email"
//             value={email}
//             onChange={e => this.setState({ email: e.target.value })}
//             style={{ marginLeft: '10px' }}
//           />
//         </label>
//         <br />
//         <button onClick={this.handleUpdate} style={{ marginTop: '10px', marginRight: '10px' }}>
//           Update User
//         </button>
//         <button onClick={this.handleDelete} style={{ marginTop: '10px' }}>
//           Delete User
//         </button>
//         {updateMessage && <p style={{ color: 'green', marginTop: '10px' }}>{updateMessage}</p>}
//       </div>
//     )
//   }

//   render() {
//     const { userId, userData, errorMsg, redirect } = this.state

//     if (redirect) {
//       return <Navigate to="/" />
//     }

//     return (
//       <div>
//         <Header />
//         <div style={{ padding: '20px' }}>
//           <h2>Get User By ID</h2>
//           <input
//             type="text"
//             placeholder="Enter User ID"
//             value={userId}
//             onChange={this.handleChange}
//           />
//           <button onClick={this.fetchUser} style={{ marginLeft: '10px' }}>
//             Get User
//           </button>

//           {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

//           {userData && this.renderUserInfo()}
//         </div>
//       </div>
//     )
//   }
// }

// export default GetUserById



////////////////////////////////////////////////////////////////////////



// src/components/GetUserById/index.js
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../Header'

class GetUserById extends Component {
  state = {
    userId: '',
    userData: null,
    errorMsg: '',
    redirect: false,
    name: '',
    email: '',
    updateMessage: '',
    isEditing: false,
  }

  handleChange = event => {
    this.setState({ userId: event.target.value })
  }

  fetchUser = async () => {
    const { userId } = this.state
    try {
      const response = await fetch(`http://localhost:5009/user/${userId}`)
      if (!response.ok) {
        throw new Error('User not found')
      }
      const data = await response.json()
      this.setState({
        userData: data,
        errorMsg: '',
        name: data.name,
        email: data.email,
        updateMessage: '',
        isEditing: false,
      })
    } catch (error) {
      this.setState({ userData: null, errorMsg: error.message, updateMessage: '', isEditing: false })
    }
  }

handleDelete = async () => {
  const { userId } = this.state
  try {
    const response = await fetch(`http://localhost:5009/user/${userId}`, {
      method: 'DELETE',
    })
    if (response.ok) {
      alert('User deleted successfully!')
      // Simulate logout
      localStorage.removeItem('jwt_token')
      this.setState({ redirect: true })
    } else {
      alert('Failed to delete user.')
    }
  } catch (error) {
    alert('Error deleting user.')
  }
}

  enableEditing = () => {
    this.setState({ isEditing: true })
  }

  handleUpdate = async () => {
    const { userId, name, email } = this.state
    try {
      const response = await fetch(`http://localhost:5009/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      })
      if (response.ok) {
        this.setState({
          updateMessage: 'User updated successfully!',
        }, this.fetchUser)
      } else {
        this.setState({ updateMessage: 'Failed to update user.' })
      }
    } catch (error) {
      this.setState({ updateMessage: 'Error updating user.' })
    }
  }

  renderUserInfo = () => {
    const { userData, name, email, updateMessage, isEditing } = this.state
    return (
      <div style={{ marginTop: '20px' }}>
        <h3>User Details</h3>
        <p><strong>ID:</strong> {userData.id}</p>
        {isEditing ? (
          <>
            <label>
              <strong>Name:</strong>
              <input
                type="text"
                value={name}
                onChange={e => this.setState({ name: e.target.value })}
                style={{ marginLeft: '10px' }}
              />
            </label>
            <br />
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                value={email}
                onChange={e => this.setState({ email: e.target.value })}
                style={{ marginLeft: '10px' }}
              />
            </label>
            <br />
            <button onClick={this.handleUpdate} style={{ marginTop: '10px', marginRight: '10px' }}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <button onClick={this.enableEditing} style={{ marginTop: '10px', marginRight: '10px' }}>
              Update User
            </button>
          </>
        )}
        <button onClick={this.handleDelete} style={{ marginTop: '10px' }}>
          Delete User
        </button>
        {updateMessage && <p style={{ color: 'green', marginTop: '10px' }}>{updateMessage}</p>}
      </div>
    )
  }

  render() {
    const { userId, userData, errorMsg, redirect } = this.state

 if (redirect) {
  return <Navigate to="/login" replace />
}


    return (
      <div>
        <Header />
        <div style={{ padding: '20px' }}>
          <h2>Get User By ID</h2>
          <input
            type="text"
            placeholder="Enter User ID"
            value={userId}
            onChange={this.handleChange}
          />
          <button onClick={this.fetchUser} style={{ marginLeft: '10px' }}>
            Get User
          </button>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

          {userData && this.renderUserInfo()}
        </div>
      </div>
    )
  }
}

export default GetUserById
