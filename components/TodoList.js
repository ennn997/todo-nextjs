import React from 'react'

import { useQuery } from '@tanstack/react-query'

import { Box, Text, CircularProgress, OrderedList, ListItem } from '@chakra-ui/react'

import Todo from './Todo'
import { getTodos } from '../pages/index'

const TodoList = () => {
  const { isLoading, data: todos, isError, error } = useQuery(['todos'], getTodos)

  if (isLoading) {
    return (
      <CircularProgress isIndeterminate color="purple.300" marginTop="50px" justifyContent="center" display="flex" />
    )
  }

  if (isError) {
    return (
      <Text align="center" marginTop="40px">
        {error.message}
      </Text>
    )
  }

  let content

  if (todos.length > 0) {
    content = (
      <OrderedList ml="20px" fontSize="17px">
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <Todo id={todo.id} todoTask={todo.todoTask} />
          </ListItem>
        ))}
      </OrderedList>
    )
  }

  if (todos.length === 0) {
    content = (
      <Box align="center" marginLeft="auto" marginRight="auto" marginTop="60px">
        <Text variant="text">Nothing To-Do!</Text>
      </Box>
    )
  }
  return <>{content}</>
}

export default TodoList
