import { http, HttpResponse } from 'msw'

let users = [{ id: 1, name: 'Ada Lovelace' }]

export const handlers = [
    http.get('/api/users', () => {
        return HttpResponse.json(users)
    }),

    http.post('/api/users', async ({ request }) => {
        const body = await request.json() as { name: string }
        const newUser = { id: Date.now(), ...body }
        users.push(newUser)
        return new HttpResponse(null, { status: 201 })
    }),
] 