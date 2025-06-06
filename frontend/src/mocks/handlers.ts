import { http, HttpResponse } from 'msw'

// Initialize users from localStorage or default
const getUsers = () => {
    const stored = localStorage.getItem('mockUsers')
    return stored ? JSON.parse(stored) : [{ id: 1, name: 'Ada Lovelace' }]
}

const saveUsers = (users: any[]) => {
    localStorage.setItem('mockUsers', JSON.stringify(users))
}

let users = getUsers()

export const handlers = [
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
] 