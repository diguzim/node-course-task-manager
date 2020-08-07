const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)
    console.log(user)
    user.save().then(() => {
        res.status(201).send(user)
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(error => {
        res.status(500).send()
    })
})

app.get('/users/:id', (req, res) => {
    const { id } = req.params
    
    User.findById(id).then(user => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch(error => {
        res.status(500).send()
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)
    console.log(task)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.get('/tasks', (req, res) => {
    Task.find({}).then(tasks => {
        res.send(tasks)
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    Task.findById(id).then(task => {
        if (!task) {
            return res.status(404).send()
        }
        return res.send(task)
    }).catch(error => {
        return res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})