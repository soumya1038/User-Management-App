// import React, { useEffect, useState } from 'react';

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // ✅ Make sure this matches your Flask port (5009)
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://localhost:5009/users');
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (err) {
//         console.error('Fetch error:', err.message);
//         setError('Failed to fetch users');
//       }
//     };

//     fetchUsers();
//   }, []);

//   if (error) {
//     return <div style={{ color: 'red' }}>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Users List</h2>
//       <ul>
//         {users.length === 0 ? (
//           <li>No users found.</li>
//         ) : (
//           users.map(user => (
//             <li key={user.id}>{user.name} - {user.email}</li>
//           ))
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Users;


/////////////////////////////////////////////////



import React, { Component } from 'react'
import Header from '../Header'

class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      errorMessage: '',
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt_token')
    if (!token) {
      window.location.href = '/login'
      return
    }
    this.fetchUsers()
  }

  fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5009/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      const users = await response.json()
      this.setState({ users })
    } catch (error) {
      this.setState({ errorMessage: 'Could not load users' })
    }
  }

  render() {
    const { users, errorMessage } = this.state

    return (
      <div>
        <Header />
        <h1>User List</h1>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <strong>ID:</strong> {user.id} <strong>Name:</strong> {user.name} <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Users
