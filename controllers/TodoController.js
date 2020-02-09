const Todo = require('../models/todo')

class TodoController {
    async index(req, res) {

    }

    async add(req, res) {
        try {
            const todo = Todo.create({
                title: req.body.title,
                done: false
            })

            return res.status(201).json({todo})
        } catch (e) {
            console.log(e)

            return res.status(500).json({
                message: 'Server error.',
            })
        }
    }

    async edit(req, res) {

    }

    async delete(req, res) {

    }
}

module.exports = TodoController