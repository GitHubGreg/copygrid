import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import { Copydeck } from './components/Copydeck'
import { ProtectedRoute } from './components/ProtectedRoute'

function AppContent() {
  const { user, login } = useAuth()

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/copydeck/tcn" replace /> : <Login onLogin={login} />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/copydeck/:clientId"
        element={
          <ProtectedRoute>
            <Copydeck />
          </ProtectedRoute>
        }
      />
      <Route
        path="/copydeck"
        element={<Navigate to="/copydeck/tcn" replace />}
      />
      <Route
        path="/"
        element={
          user ? <Navigate to="/copydeck/tcn" replace /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
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
