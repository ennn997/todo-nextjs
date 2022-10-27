import React from 'react'

import { HStack, Button, Text } from '@chakra-ui/react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import '@fontsource/roboto-slab'

const Todo = (props) => {
  const queryClient = useQueryClient()

  const { mutate, isError, error } = useMutation(
    async () => {
      const id = props.id

      const response = await fetch(`/api/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
    },

    {
      onError: (error, newData, rollback) => rollback(),
      onSettled: () => {
        queryClient.invalidateQueries('todos')
      },
    }
  )

  const handleRemoveTodo = (id) => mutate(id)

  if (isError) {
    return <Text align="center">{error.message}</Text>
  }

  return (
    <>
      <HStack spacing="28px" mt="40px" direction="row" marginLeft="auto" justify="space-between">
        <Text variant="text">{props.todoTask}</Text>
        <Button variant="Button" onClick={handleRemoveTodo}>
          Delete
        </Button>
      </HStack>
    </>
  )
}

export default Todo
