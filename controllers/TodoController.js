const BasicController = require('./BasicController')
const Todo = require('../models/todo')

class TodoController extends BasicController {
    async index(req, res) {
        return this.handle(req, res, async (req, res) => {
            const todos = await Todo.findAll()

            return res.status(200).json(todos)
        })
    }

    async add(req, res) {
        return this.handle(req, res, async (req, res) => {
            const todo = Todo.create({
                title: req.body.title,
                done: false
            })

            return res.status(201).json({todo})
        })
    }

    async edit(req, res) {
        return this.handle(req, res, async (req, res) => {
            const todo = await Todo.findByPk(+req.body.id)
            todo.done = req.body.done

            await Todo.save()

            return res.status(200)
                .json({todo})
        })
    }

    async delete(req, res) {

    }

}

module.exports = TodoController