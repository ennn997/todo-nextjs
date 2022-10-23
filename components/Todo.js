import React from 'react'

import Router from 'next/router'

import { HStack, Button, Text } from '@chakra-ui/react'

import '@fontsource/roboto-slab'

const Todo = (props) => {
  const handleRemoveTodo = async () => {
    const { id } = props
    try {
      const response = await fetch(`/api/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      })
      const result = await response.json()
      await Router.push('/')
      return result
    } catch (error) {
      return { error: 'Oh, something went wrong' }
    }
  }

  return (
    <HStack spacing="28px" mt="40px" direction="row" marginLeft="auto" justify="space-between">
      <Text fontSize="17px" fontFamily={'Roboto slab, sans-serif'}>
        {props.todoTask}
      </Text>
      <Button
        colorScheme="white"
        width={'90px'}
        borderWidth="1px"
        borderRadius=" 16px"
        color="blackAlpha.900"
        fontSize="17px"
        fontFamily={'Roboto slab, sans-serif'}
        onClick={handleRemoveTodo}
      >
        Delete
      </Button>
    </HStack>
  )
}

export default Todo
