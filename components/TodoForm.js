import React from 'react'

import Router from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Input, Box, Heading, Center, HStack, Text, Button } from '@chakra-ui/react'

import '@fontsource/roboto-slab'

import TodoList from './TodoList'

const schema = yup
  .object()
  .shape({
    todoTask: yup.string().required(),
  })
  .required()

const TodoForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmitForm = async (todoTask) => {
    try {
      const response = await fetch(`/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoTask),
      })
      const result = await response.json()
      reset()
      await Router.push('/')
      return result
    } catch (error) {
      return { error: 'Oh, something went wrong' }
    }
  }

  return (
    <Center>
      <Box
        bg="white"
        maxWidth={['300px', '990px']}
        p={5}
        ml="auto"
        mr="auto"
        mt="90px"
        borderWidth="1px"
        borderRadius=" 16px"
        boxShadow="0 20px 80px rgba(0,0,0,0.4)"
        fontFamily={'Roboto slab, sans-serif'}
      >
        <Heading fontSize="32px" align="center" fontFamily={'Roboto slab'}>
          My To-Do List!
        </Heading>

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <HStack mt="80px" spacing="34px" direction="row">
            <Input
              borderRadius="16px"
              maxWidth={['220px', '350px']}
              placeholder="Add new To-Do"
              fontFamily={'Roboto slab, sans-serif'}
              fontSize="17px"
              {...register('todoTask')}
            />

            <Button
              colorScheme="white"
              width={'90px'}
              borderWidth="1px"
              borderRadius=" 16px"
              color="blackAlpha.900"
              fontSize="17px"
            >
              Add
            </Button>
          </HStack>
          {errors.todoTask ? (
            <Text color="red" ml="10px">
              Please write some To-Do!
            </Text>
          ) : null}
        </form>

        <TodoList todos={props.todos} />
      </Box>
    </Center>
  )
}

export default TodoForm
