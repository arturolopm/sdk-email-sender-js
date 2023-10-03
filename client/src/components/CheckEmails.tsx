/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../constants/constants'

interface EmailData {
  license_id: number
  sent_at: string
}
const CheckEmails: React.FC = () => {
  const [emailCount, setEmailCount] = useState('')
  const [data, setData] = useState<EmailData[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCount(e.target.value)
  }

  const actionEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `${BASE_URL}/api/licenses/last-emails/${emailCount}`
      )
      console.log('res', response)

      setData(response.data)
    } catch (error: any) {
      setData(error.message)
      console.error('Error:', error)
    }
  }

  return (
    <div className='bg-white pt-4'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <form
            onSubmit={(e) => actionEmail(e)}
            className='max-w-xl py-4 flex-col items-start justify-between px-2 shadow-md'>
            <label htmlFor='emailCount '>
              Enter the number of emails to check:
            </label>
            <input
              required
              className=' border border-gray-300'
              type='number'
              id='emailCount'
              name='emailCount'
              value={emailCount}
              onChange={(e) => handleChange(e)}
            />
            <button
              type='submit'
              className='rounded-full bg-black px-3 py-1.5 font-medium text-white'>
              Check Emails
            </button>
            <div className=' flex flex-col gap-2 mx-auto'>
              {data.length > 0 && (
                <p> checking last {emailCount} emails sent:</p>
              )}
              {data &&
                data.map((email, index) => (
                  <div
                    className='border w-full p-2'
                    key={index}>
                    <div>License ID: {email.license_id}</div>
                    <div>Sent At: {email.sent_at}</div>
                  </div>
                ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CheckEmails
