
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
