import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface AuthUser {
    id: number
    email: string
    name: string
}

interface AuthContextType {
    user: AuthUser | null
    token: string | null
    login: (email: string, password: string) => Promise<boolean>
    logout: () => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // Check for existing auth on mount
    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')
            if (storedToken) {
                const response = await fetch('/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`
                    }
                })

                if (response.ok) {
                    const userData = await response.json()
                    setUser(userData)
                    setToken(storedToken)
                } else {
                    // Token is invalid, clear it
                    localStorage.removeItem('authToken')
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error)
            localStorage.removeItem('authToken')
        } finally {
            setLoading(false)
        }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                const data = await response.json()
                setUser(data.user)
                setToken(data.token)
                localStorage.setItem('authToken', data.token)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('Login failed:', error)
            return false
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setUser(null)
            setToken(null)
            localStorage.removeItem('authToken')
        }
    }

    const value = {
        user,
        token,
        login,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
} 