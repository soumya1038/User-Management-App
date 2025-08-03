import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    navigate('/login')
  }

  return (
    <header>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/users')}>Users</button>
      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header
