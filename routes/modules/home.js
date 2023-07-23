const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User
const Todo = db.Todo

router.get('/', (req, res) => {
  return Todo.findAll({
    raw: true,
    nest: true,
  })
    .then((todos) => {
      return res.render('index', { todos: todos })
    })
    .catch((error) => {
      return res.status(422).json(error)
    })
})

router.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((error) => console.log(error))
})

module.exports = router
