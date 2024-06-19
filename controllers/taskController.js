const Task = require('../models/Task')

const createTodo = async (req, res) => {
  const { text } = req.body

  try {
    if (text === '') {
      return res.status(404).json({ message: 'text field should not empty' })
    }
    const newTask = new Task({
      text: req.body.text,
      completed: false,
    })
    const task = await newTask.save()
    res.status(201).json(task)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const getTodos = async (req, res) => {
  try {
    const todos = await Task.find()
    res.status(201).json(todos)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const updateTodo = async (req, res) => {
  const { id } = req.params
  const { completed } = req.body
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        completed,
      },
      { new: true }
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' })
    }
    return res.status(200).send(updatedTask)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

const deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Task.findByIdAndDelete(req.params.id)

    if (!deleteTodo) {
      return res.status(404).json({ message: 'Task not found' })
    }
    res.status(201).json({ message: 'Task deleted successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}

module.exports = { createTodo, getTodos, updateTodo, deleteTodo }
