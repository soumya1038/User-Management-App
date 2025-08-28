import { useState } from 'react'
import { API } from '../api'
import './index.css'

const CreateUser = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const response = await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    if (response.status === 409) {
      alert('Email already exists')
      return
    }

    if (!response.ok) {
      alert('User creation failed')
      return
    }

    alert('User created successfully!')
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <form className="create-user-form" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Create User</button>
    </form>
  )
}

export default CreateUser
