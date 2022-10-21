import prisma from '../../lib/prisma'

export default async function (req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    const todoId = Number(id)

    try {
      const todo = await prisma.todo.delete({ where: { id: todoId } })
      return res.status(200).json(todo)
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  }
}
