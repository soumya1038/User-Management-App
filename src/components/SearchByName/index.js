
import { Component } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../Header'

class SearchByName extends Component {
  state = {
    searchName: '',
    users: [],
    errorMsg: '',
    redirect: false,
    editingUserId: null,
    editedName: '',
    editedEmail: '',
    updateMsg: '',
  }

  handleChange = event => {
    this.setState({ searchName: event.target.value })
  }

  searchUsers = async () => {
    const { searchName } = this.state
    try {
      const response = await fetch(`http://localhost:5009/search?name=${searchName}`)
      if (!response.ok) {
        throw new Error('No users found')
      }
      const data = await response.json()
      if (data.length === 0) {
        throw new Error('No users found')
      }
      this.setState({ users: data, errorMsg: '', updateMsg: '' })
    } catch (error) {
      this.setState({ users: [], errorMsg: error.message })
    }
  }

  handleDelete = async userId => {
    try {
      const response = await fetch(`http://localhost:5009/user/${userId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        alert('User deleted successfully!')
        localStorage.removeItem('jwt_token')
        this.setState({ redirect: true })
      } else {
        alert('Failed to delete user.')
      }
    } catch (error) {
      alert('Error deleting user.')
    }
  }

  enableEdit = user => {
    this.setState({
      editingUserId: user.id,
      editedName: user.name,
      editedEmail: user.email,
      updateMsg: '',
    })
  }

  handleUpdate = async userId => {
    const { editedName, editedEmail } = this.state
    try {
      const response = await fetch(`http://localhost:5009/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName, email: editedEmail }),
      })
      if (response.ok) {
        this.searchUsers()
        this.setState({ editingUserId: null, updateMsg: 'User updated successfully!' })
      } else {
        this.setState({ updateMsg: 'Failed to update user.' })
      }
    } catch (error) {
      this.setState({ updateMsg: 'Error updating user.' })
    }
  }

  renderUsers = () => {
    const { users, editingUserId, editedName, editedEmail } = this.state
    return (
      <ul>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '15px' }}>
            <p><strong>ID:</strong> {user.id}</p>
            {editingUserId === user.id ? (
              <>
                <label>
                  <strong>Name:</strong>
                  <input
                    type="text"
                    value={editedName}
                    onChange={e => this.setState({ editedName: e.target.value })}
                    style={{ marginLeft: '10px' }}
                  />
                </label>
                <br />
                <label>
                  <strong>Email:</strong>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={e => this.setState({ editedEmail: e.target.value })}
                    style={{ marginLeft: '10px' }}
                  />
                </label>
                <br />
                <button onClick={() => this.handleUpdate(user.id)} style={{ marginTop: '10px', marginRight: '10px' }}>
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <button onClick={() => this.enableEdit(user)} style={{ marginRight: '10px' }}>
                  Update User
                </button>
              </>
            )}
            <button onClick={() => this.handleDelete(user.id)} style={{ marginTop: '10px' }}>
              Delete User
            </button>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const { searchName, errorMsg, users, redirect, updateMsg } = this.state

    if (redirect) {
      return <Navigate to="/login" replace />
    }

    return (
      <div>
        <Header />
        <div style={{ padding: '20px' }}>
          <h2>Search by Name</h2>
          <input
            type="text"
            placeholder="Enter Name"
            value={searchName}
            onChange={this.handleChange}
          />
          <button onClick={this.searchUsers} style={{ marginLeft: '10px' }}>
            Search
          </button>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
          {updateMsg && <p style={{ color: 'green' }}>{updateMsg}</p>}

          {users.length > 0 && this.renderUsers()}
        </div>
      </div>
    )
  }
}

export default SearchByName
