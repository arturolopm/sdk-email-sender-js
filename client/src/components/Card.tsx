/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { useState } from 'react'
import { useFetch } from 'usehooks-ts'
interface CardProps {
  id: number
  title: string
  description: string
  button: {
    title: string
    href: string
  }
  emails_sent: {
    name: string
    role: string
  }
}

const Card: React.FC<{ card: CardProps }> = ({ card }) => {
  const [data, setData] = useState<any[]>([]) // eslint-disable-line @typescript-eslint/no-explicit-any
  const actionEmail = async () => {
    const response = await axios.post(card.button.href)
    setData(response.data.responseItem)
  }
  return (
    <article
      key={card.id}
      className='flex max-w-xl py-4 flex-col items-start justify-between px-2 shadow-md'>
      <div className='group relative'>
        <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
          <div>
            <span className='absolute inset-0' />
            {card.title}
          </div>
        </h3>
        <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
          {card.description}
        </p>
      </div>
      <div className='flex self-end items-center mt-2 gap-x-4 text-xs'>
        <button
          onClick={actionEmail}
          className='relative z-10 rounded-full bg-black px-3 py-1.5 font-medium text-white '>
          {card.button.title}
        </button>
      </div>
      <div className='mt-2 flex items-center gap-x-4'>
        <div className='text-sm leading-6'>
          <p className='font-semibold text-gray-900'>{card.emails_sent.name}</p>
          {/* <p className='text-gray-700'>{card.emails_sent.role}</p> */}
        </div>
      </div>
      {data &&
        data.map((email) => {
          console.log('data', email)

          return (
            <div
              className=' border w-full p-2'
              key={email.licenseData!.id}>
              <div>client: {email.clientData!.poc_email}</div>
              <div>Admin: {email.adminData!.email_address}</div>
            </div>
          )
        })}
    </article>
  )
}

export default Card
