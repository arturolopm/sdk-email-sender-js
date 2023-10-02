/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../../constants/constants'

const CreateLicenseForm: React.FC = () => {
  const [packageType, setPackageType] = useState('')
  const [licenseType, setLicenseType] = useState('')
  const [clientId, setClientId] = useState(0)
  const [responseMessage, setResponseMessage] = useState('')

  const handlePackageTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPackageType(e.target.value)
  }

  const handleLicenseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLicenseType(e.target.value)
  }

  const handleClientIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientId(parseInt(e.target.value, 10))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const clients = await axios.get(`${BASE_URL}/api/clients`)
    try {
      if (clientId > clients.data.length) {
        setResponseMessage(
          `Client ID can't be larger than the total number of clients. Please provide a valid client ID.`
        )
        return
      }

      const { data } = (await axios.post(`${BASE_URL}/api/licenses`, {
        package: packageType,
        license_type: licenseType,
        client_id: clientId
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
          <h2 className=' text-lg font-bold '>Create License</h2>
          <form
            onSubmit={handleSubmit}
            className='max-w-xl py-4 flex flex-col items-start justify-between px-2 shadow-md'>
            <label htmlFor='packageType'>Package Type:</label>
            <select
              required
              className='border border-gray-300'
              id='packageType'
              value={packageType}
              onChange={handlePackageTypeChange}>
              <option value=''>Select Package Type</option>
              <option value='javascript_sdk'>JavaScript SDK</option>
              <option value='ios_sdk'>iOS SDK</option>
              <option value='android_sdk'>Android SDK</option>
            </select>

            <label htmlFor='licenseType'>License Type:</label>
            <select
              required
              className='border border-gray-300'
              id='licenseType'
              value={licenseType}
              onChange={handleLicenseTypeChange}>
              <option value=''>Select License Type</option>
              <option value='production'>Production</option>
              <option value='evaluation'>Evaluation</option>
            </select>

            <label htmlFor='clientId'>Client ID:</label>
            <input
              className='border border-gray-300'
              type='number'
              id='clientId'
              value={clientId}
              onChange={handleClientIdChange}
            />

            <button className='rounded-full bg-black px-3 py-1.5 font-medium text-white'>
              Create License
            </button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
      </div>
    </div>
  )
}

export default CreateLicenseForm
