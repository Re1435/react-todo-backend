const express = require('express')
const router = express.Router()
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require('../controllers/taskController')

router.post('/add-task', createTodo)
router.get('/get-tasks', getTodos)
router.put('/update-taskStatus/:id', updateTodo)
router.delete('/delete-task/:id', deleteTodo)

module.exports = router
