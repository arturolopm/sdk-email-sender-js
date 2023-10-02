/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../constants/constants'

const CreateClientForm: React.FC = () => {
  const [pocName, setPocName] = useState('')
  const [pocEmail, setPocEmail] = useState('')
  const [adminPoc, setAdminPoc] = useState(0)
  const [responseMessage, setResponseMessage] = useState('')

  const handlePocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPocName(e.target.value)
  }

  const handlePocEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPocEmail(e.target.value)
  }

  const handleAdminPocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminPoc(parseInt(e.target.value, 10))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const users = await axios.get(`${BASE_URL}/api/users`)
    try {
      if (adminPoc > users.data.length) {
        setResponseMessage(
          `Admin Point of Contact id can not be larger than the total number of admins, it should be a number between 1 and ${users.data.length}`
        )
        return
      }
      const { data } = (await axios.post(`${BASE_URL}/api/clients`, {
        poc_name: pocName,
        poc_email: pocEmail,
        admin_poc: adminPoc
      })) as any

      const message = data.message
      setResponseMessage(() => message)
    } catch (error: any) {
      console.log(error)

      setResponseMessage(() => error.response.data.message)
    }
  }

  return (
    <div className='bg-white pt-4'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className=' text-lg font-bold '>Create Client</h2>
          <form
            onSubmit={handleSubmit}
            className='max-w-xl py-4 flex flex-col items-start justify-between px-2 shadow-md'>
            <label htmlFor='pocName'>Point of Contact Name:</label>
            <input
              required
              className='border border-gray-300'
              type='text'
              id='pocName'
              value={pocName}
              onChange={handlePocNameChange}
            />

            <label htmlFor='pocEmail'>Point of Contact Email:</label>
            <input
              required
              className='border border-gray-300'
              type='email'
              id='pocEmail'
              value={pocEmail}
              onChange={handlePocEmailChange}
            />

            <label htmlFor='adminPoc'>Admin Point of Contact:</label>
            <input
              className='border border-gray-300'
              type='number'
              id='adminPoc'
              value={adminPoc}
              onChange={handleAdminPocChange}
            />

            <button className='rounded-full bg-black px-3 py-1.5 font-medium text-white'>
              Create Client
            </button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default CreateClientForm
