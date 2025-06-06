import { http, HttpResponse } from 'msw'

// Type definitions
interface User {
    id: number
    name: string
}

interface AuthUser {
    id: number
    email: string
    name: string
}

interface MockAccount {
    id: number
    email: string
    password: string
    name: string
}

interface AuthState {
    user: AuthUser | null
    token: string | null
}

// Initialize users from localStorage or default
const getUsers = (): User[] => {
    const stored = localStorage.getItem('mockUsers')
    return stored ? JSON.parse(stored) : [{ id: 1, name: 'Ada Lovelace' }]
}

const saveUsers = (users: User[]) => {
    localStorage.setItem('mockUsers', JSON.stringify(users))
}

// Authentication management
const getAuthState = (): AuthState => {
    const stored = localStorage.getItem('mockAuthState')
    return stored ? JSON.parse(stored) : { user: null, token: null }
}

const saveAuthState = (authState: AuthState) => {
    localStorage.setItem('mockAuthState', JSON.stringify(authState))
}

// Mock users database for authentication
const getMockAccounts = (): MockAccount[] => {
    const stored = localStorage.getItem('mockAccounts')
    return stored ? JSON.parse(stored) : [
        { id: 1, email: 'demo@copygrid.com', password: 'password', name: 'Demo User' },
        { id: 2, email: 'admin@copygrid.com', password: 'admin123', name: 'Admin User' }
    ]
}

const saveMockAccounts = (accounts: MockAccount[]) => {
    localStorage.setItem('mockAccounts', JSON.stringify(accounts))
}

let users = getUsers()
let mockAccounts = getMockAccounts()

export const handlers = [
    // User management endpoints
    http.get('/api/users', () => {
        return HttpResponse.json(users)
    }),

    http.post('/api/users', async ({ request }) => {
        const body = await request.json() as { name: string }
        const newUser = { id: Date.now(), ...body }
        users.push(newUser)
        saveUsers(users)
        return new HttpResponse(null, { status: 201 })
    }),

    // Authentication endpoints
    http.post('/api/auth/login', async ({ request }) => {
        const body = await request.json() as { email: string; password: string }

        // Find user by email and password
        const user = mockAccounts.find(
            (account: MockAccount) => account.email === body.email && account.password === body.password
        )

        if (user) {
            const token = `mock-jwt-${user.id}-${Date.now()}`
            const authState: AuthState = {
                user: { id: user.id, email: user.email, name: user.name },
                token
            }
            saveAuthState(authState)

            return HttpResponse.json({
                user: authState.user,
                token: authState.token
            })
        } else {
            return new HttpResponse(null, { status: 401 })
        }
    }),

    http.post('/api/auth/logout', () => {
        saveAuthState({ user: null, token: null })
        return new HttpResponse(null, { status: 200 })
    }),

    http.get('/api/auth/me', ({ request }) => {
        const authHeader = request.headers.get('Authorization')
        const authState = getAuthState()

        if (authHeader?.startsWith('Bearer ') && authState.token && authState.user) {
            const token = authHeader.substring(7)
            if (token === authState.token) {
                return HttpResponse.json(authState.user)
            }
        }

        return new HttpResponse(null, { status: 401 })
    }),

    http.post('/api/auth/register', async ({ request }) => {
        const body = await request.json() as { email: string; password: string; name: string }

        // Check if user already exists
        const existingUser = mockAccounts.find((account: MockAccount) => account.email === body.email)
        if (existingUser) {
            return HttpResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        // Create new user
        const newUser: MockAccount = {
            id: Date.now(),
            email: body.email,
            password: body.password,
            name: body.name
        }

        mockAccounts.push(newUser)
        saveMockAccounts(mockAccounts)

        // Auto-login the new user
        const token = `mock-jwt-${newUser.id}-${Date.now()}`
        const authState: AuthState = {
            user: { id: newUser.id, email: newUser.email, name: newUser.name },
            token
        }
        saveAuthState(authState)

        return HttpResponse.json({
            user: authState.user,
            token: authState.token
        })
    }),
] 