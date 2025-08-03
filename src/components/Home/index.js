// // src/components/Home/index.js
// import React, { useState } from 'react'

// const Home = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: ''
//   })

//   const handleChange = e => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = e => {
//     e.preventDefault()
//     fetch('http://localhost:5009/users', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData)
//     })
//       .then(res => res.text())
//       .then(data => alert(data))
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded">
//       <h2 className="text-xl mb-2">Create User</h2>
//       <input
//         name="name"
//         placeholder="Name"
//         onChange={handleChange}
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         className="border p-2 mb-2 w-full"
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Password"
//         onChange={handleChange}
//         className="border p-2 mb-2 w-full"
//       />
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//         Create User
//       </button>
//     </form>
//   )
// }

// export default Home;

//////////////////////////////////

// import React, { useState, useEffect } from 'react'

// const Home = () => {
//   const [users, setUsers] = useState([])
//   const [formData, setFormData] = useState({ name: '', email: '', password: '' })
//   const [editUserId, setEditUserId] = useState(null)

//   useEffect(() => {
//     fetchUsers()
//   }, [])

//   const fetchUsers = async () => {
//     const response = await fetch('http://localhost:5009/users')
//     const data = await response.json()
//     setUsers(data)
//   }

//   const handleChange = e => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleSubmit = async e => {
//     e.preventDefault()
//     const url = editUserId
//       ? `http://localhost:5009/user/${editUserId}`
//       : 'http://localhost:5009/users'

//     const method = editUserId ? 'PUT' : 'POST'

//     await fetch(url, {
//       method,
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     })

//     setEditUserId(null)
//     setFormData({ name: '', email: '', password: '' })
//     fetchUsers()
//   }

//   const handleEdit = user => {
//     setEditUserId(user.id)
//     setFormData({ name: user.name, email: user.email, password: user.password })
//   }

//   const handleDelete = async id => {
//     await fetch(`http://localhost:5009/user/${id}`, {
//       method: 'DELETE',
//     })
//     fetchUsers()
//   }

//   return (
//     <div>
//       <h1>User Management System</h1>
//       <form onSubmit={handleSubmit}>
//         <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
//         <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required />
//         <button type="submit">{editUserId ? 'Update' : 'Create'} User</button>
//       </form>
//       <h2>All Users</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name} ({user.email})
//             <button onClick={() => handleEdit(user)}>Edit</button>
//             <button onClick={() => handleDelete(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default Home


//////////////////////////////////////////////////////////////////////




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
