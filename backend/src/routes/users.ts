import express from 'express'

const router = express.Router()

// In-memory storage (replace with database in production)
let users = [{ id: 1, name: 'Ada Lovelace' }]

// GET /api/users - Get all users
router.get('/', (req, res) => {
    res.json(users)
})

// POST /api/users - Create new user
router.post('/', (req, res) => {
    const { name } = req.body

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required and must be a non-empty string' })
    }

    const newUser = {
        id: Date.now(),
        name: name.trim()
    }

    users.push(newUser)
    res.status(201).json(newUser)
})

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const user = users.find(u => u.id === id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    res.json(user)
})

// PUT /api/users/:id - Update user
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const { name } = req.body

    if (!name || typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ error: 'Name is required and must be a non-empty string' })
    }

    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' })
    }

    users[userIndex] = { ...users[userIndex], name: name.trim() }
    res.json(users[userIndex])
})

// DELETE /api/users/:id - Delete user
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' })
    }

    users.splice(userIndex, 1)
    res.status(204).send()
})

export default router 