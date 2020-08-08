const express = require('express')
const Task = require('../models/task')

const router = new express.Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).send()
        }

        return res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const allowedUpdates = ['description', 'completed']

    const updates = Object.keys(req.body)
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findById(id)

        updates.forEach(update => task[update] = req.body[update])
        task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        return res.status(400).send(e)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params

    try {
        const task = await Task.findByIdAndDelete(id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router
