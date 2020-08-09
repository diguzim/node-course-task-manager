const express = require('express')
const Task = require('../models/task')

const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', auth, async (req, res) => {
    const { completed, limit, skip, sortBy } = req.query
    const match = {}
    const sort = {}

    if (completed) {
        match.completed = completed === 'true' ? true : false
    }

    if (sortBy) {
        const parts = sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(limit),
                skip: parseInt(skip),
                sort
            }
        }).execPopulate()
        
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        return res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params;
    const allowedUpdates = ['description', 'completed']

    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach(update => task[update] = req.body[update])
        task.save()

        res.send(task)
    } catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router
