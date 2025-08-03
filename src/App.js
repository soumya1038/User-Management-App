// // App.js
// import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
// import Home from './components/Home'
// import Users from './components/Users'

// const App = () => (
//   <BrowserRouter>
//     <nav>
//       <ul>
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/users">Users</Link></li>
//       </ul>
//     </nav>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/users" element={<Users />} />
      
//     </Routes>
//   </BrowserRouter>
// )

// export default App


////////////////////////////////////////////////////////



// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import Login from './components/Login'
// import Home from './components/Home'
// import Users from './components/Users'
// import ProtectedRoute from './components/ProtectedRoute'

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/home"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/users"
//           element={
//             <ProtectedRoute>
//               <Users />
//             </ProtectedRoute>
//           }
//         />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }

// export default App




///////////////////////////////////////////////////////////////////////////////////////





import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Users from './components/Users'
import ProtectedRoute from './components/ProtectedRoute'
import GetUserById from './components/GetUserById'
import SearchByName from './components/SearchByName'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-user-by-id"
            element={
              <ProtectedRoute>
                <GetUserById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-user-by-name"
            element={
              <ProtectedRoute>
                <SearchByName />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
