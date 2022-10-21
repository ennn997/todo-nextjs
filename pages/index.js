import Head from 'next/head'

import TodoForm from '../components/TodoForm'

import prisma from '../lib/prisma'

const Home = (props) => {
  return (
    <>
      <Head>
        <title>To-Do List</title>
      </Head>
      <TodoForm todos={props.todos} />
    </>
  )
}

export const getServerSideProps = async () => {
  const todos = await prisma.todo.findMany()

  return {
    props: { todos },
  }
}

export default Home
