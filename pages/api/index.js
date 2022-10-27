import prisma from '../../lib/prisma'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const todos = await prisma.todo.findMany()
      res.status(200).json(todos)
    } catch (error) {
      res.status(500).json({ error: 'Oh, something went wrong' })
    }
  } else if (req.method === 'POST') {
    const { todoTask } = req.body
    try {
      const todo = await prisma.todo.create({ data: { todoTask: todoTask } })
      res.status(200).json(todo)
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  } else {
    res.status(404)
  }
}
