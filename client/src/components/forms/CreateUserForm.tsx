/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../constants/constants'

const CreateUserForm: React.FC = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [isStaff, setIsStaff] = useState(false)
  const [responseMessage, setResponseMessage] = useState('')

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailAddress(e.target.value)
  }

  const handleIsStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsStaff(e.target.checked)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = (await axios.post(`${BASE_URL}/api/users`, {
        first_name: firstName,
        last_name: lastName,
        email_address: emailAddress,
        isStaff: isStaff
      })) as any
      console.log('data', data)

      const message = data.message
      setResponseMessage(() => message)
    } catch (error: any) {
      setResponseMessage(() => error.response.data.message)

      //   setResponseMessage(error.toString())
    }
  }

  return (
    <div className='bg-white pt-4'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className=' text-lg font-bold '>Create User</h2>
          <form
            onSubmit={handleSubmit}
            className='max-w-xl py-4 flex flex-col items-start justify-between px-2 shadow-md'>
            <label htmlFor='firstName'>First Name:</label>
            <input
              required
              className='border border-gray-300'
              type='text'
              id='firstName'
              value={firstName}
              onChange={handleFirstNameChange}
            />

            <label htmlFor='lastName'>Last Name:</label>
            <input
              required
              className='border border-gray-300'
              type='text'
              id='lastName'
              value={lastName}
              onChange={handleLastNameChange}
            />

            <label htmlFor='emailAddress'>Email Address:</label>
            <input
              required
              className='border border-gray-300'
              type='email'
              id='emailAddress'
              value={emailAddress}
              onChange={handleEmailChange}
            />

            <label htmlFor='isStaff'>Is Staff:</label>
            <input
              className='border border-gray-300'
              type='checkbox'
              id='isStaff'
              checked={isStaff}
              onChange={handleIsStaffChange}
            />

            {responseMessage && <p>{responseMessage}</p>}
            <button className='rounded-full bg-black px-3 py-1.5 font-medium text-white'>
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateUserForm
