import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'
import { TbCopy, TbLogout, TbUser } from 'react-icons/tb'

interface User {
  id: number
  name: string
}

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [newUserName, setNewUserName] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const userData = await response.json()
      setUsers(userData)
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUserName.trim()) return

    try {
      await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newUserName }),
      })
      setNewUserName('')
      fetchUsers()
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>

        <form onSubmit={addUser} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              placeholder="Enter user name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add User
            </button>
          </div>
        </form>

        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="font-medium text-gray-900">{user.name}</span>
                <span className="text-sm text-gray-500 ml-2">#{user.id}</span>
              </div>
            ))}
            {users.length === 0 && (
              <p className="text-gray-500 text-center py-4">No users yet. Add one above!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function PublicHome() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CopyGrid</h1>
      <p className="text-lg text-gray-600 mb-8">
        A modern React app with authentication and user management
      </p>
      <Link
        to="/login"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Get Started
      </Link>
    </div>
  )
}

function AppContent() {
  const location = useLocation()
  const { user, login, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const isLoginPage = location.pathname === '/login'

  // Full-screen layout for login page
  if (isLoginPage) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />
          } />
        </Routes>
      </div>
    )
  }

  // Normal layout with navigation for other pages
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <TbCopy className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">CopyGrid</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/users"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/users'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    Users
                  </Link>
                  <div className="flex items-center gap-2 text-gray-700">
                    <TbUser className="w-4 h-4" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <TbLogout className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={
            user ? <Navigate to="/dashboard" replace /> : <PublicHome />
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
