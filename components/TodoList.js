import React from 'react'

import { OrderedList, Box, Text, ListItem } from '@chakra-ui/react'

import Todo from './Todo'

const TodoList = (props) => {
  let content

  if (props.todos.length > 0) {
    content = (
      <OrderedList ml="20px" fontSize={'17px'}>
        {props.todos.map((todo) => (
          <ListItem key={todo.id}>
            <Todo id={todo.id} todoTask={todo.todoTask} />
          </ListItem>
        ))}
      </OrderedList>
    )
  }

  if (props.todos.length === 0) {
    content = (
      <Box align={'center'} marginLeft="auto" marginRight="auto" marginTop="60px">
        <Text color="black" fontSize={'17px'} fontFamily={'Roboto slab, sans-serif'}>
          Nothing To-Do!
        </Text>
      </Box>
    )
  }
  return <>{content}</>
}

export default TodoList
