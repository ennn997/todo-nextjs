import Head from 'next/head'

import TodoForm from '../components/TodoForm'
import { server } from '../config/index'

import { QueryClient, dehydrate } from '@tanstack/react-query'

const Home = () => {
  return (
    <>
      <Head>
        <title>To-Do List</title>
      </Head>
      <TodoForm />
    </>
  )
}

export const getTodos = async () => {
  const response = await fetch(`${server}/api/`)
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Network response not ok!')
  }
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(['todos'], getTodos)
  return { props: { dehydratedState: dehydrate(queryClient) } }
}

export default Home
