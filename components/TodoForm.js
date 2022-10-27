import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Input, Box, Heading, Center, HStack, Text, Button, CircularProgress } from '@chakra-ui/react'

import TodoList from './TodoList'

const schema = yup
  .object()
  .shape({
    todoTask: yup.string().required(),
  })
  .required()

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const queryClient = useQueryClient()

  const { mutate, isLoading, isError } = useMutation(
    async (todoTask) => {
      const response = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoTask),
      })
      if (!response.ok) {
        throw new Error('Oh no, something went wrong!')
      }
      const result = await response.json()
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries(['todos'])
      },

      onError: (error, newData, rollback) => rollback(),
    }
  )

  if (isError)
    return (
      <Text marginTop="50vh" align="center">
        Oops, something went wrong!!
      </Text>
    )

  const onSubmit = handleSubmit((data) => mutate(data, { onSuccess: () => reset() }))

  return (
    <Center>
      <Box
        bg="white"
        maxWidth={['300px', '990px']}
        p="25px"
        ml="auto"
        mr="auto"
        mt="90px"
        borderWidth="1px"
        borderRadius=" 16px"
        boxShadow="0 20px 80px rgba(0,0,0,0.4)"
      >
        <Heading variant="h1" align="center">
          My To-Do List!
        </Heading>

        <form onSubmit={onSubmit}>
          <HStack mt="80px" spacing="34px" direction="row">
            <Input
              borderRadius="16px"
              maxWidth={['220px', '350px']}
              placeholder="Add new To-Do"
              {...register('todoTask')}
            />

            <Button variant="Button">Add</Button>
          </HStack>

          {errors.todoTask ? (
            <Text color="red" ml="10px">
              Please write some To-Do!
            </Text>
          ) : null}
        </form>

        {isLoading ? (
          <CircularProgress
            isIndeterminate
            color="purple.300"
            marginLeft="auto"
            marginRight="auto"
            marginTop="40px"
            justifyContent="center"
            display="flex"
          />
        ) : (
          <TodoList />
        )}
      </Box>
    </Center>
  )
}

export default TodoForm
