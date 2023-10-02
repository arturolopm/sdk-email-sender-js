import Card from './Card'

const cards = [
  {
    id: 1,
    title: 'Send Licenses emails 4 months',
    href: '#',
    description:
      'Send email notification to the users who are point of contact of clients which licenses will expire in four months.',
    button: {
      title: 'Send now',
      href: 'http://localhost:8080/api/licenses/send-email/four-months'
    },
    emails_sent: {
      name: 'Emails sent',
      role: 'Co-Founder / CTO',
      href: '#'
    }
  },
  {
    id: 2,
    title: 'Send Licenses emails 1 month if today is monday',
    href: '#',
    description:
      'Send email notification to the users who are point of contact of clients which licenses will expire in 1 month only if today is Monday.',

    button: {
      title: 'Send now',
      href: 'http://localhost:8080/api/licenses/send-email/one-month'
    },
    emails_sent: {
      name: 'Emails sent',
      role: 'Co-Founder / CTO',
      href: '#'
    }
  },
  {
    id: 3,
    title: 'Send Licenses emails 1 week',
    href: '#',
    description:
      'Send email notification to the users who are point of contact of clients which licenses will expire in 1 week.',

    button: {
      title: 'Send now',
      href: 'http://localhost:8080/api/licenses/send-email/one-week'
    },
    emails_sent: {
      name: 'Emails sent',
      role: 'Co-Founder / CTO',
      href: '#'
    }
  },
  {
    id: 4,
    title: 'Send all',
    href: '#',
    description:
      'Send email notification to the users who are point of contact of clients which licenses will expire in any of the previous scenarios.',

    button: {
      title: 'Send now',
      href: 'http://localhost:8080/api/licenses/send-email/all'
    },
    emails_sent: {
      name: 'Emails sent',
      role: 'Co-Founder / CTO',
      href: '#'
    }
  }
  // More posts...
]

const EmailSender = () => {
  return (
    <div className='bg-white pt-4'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
            Notifier
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Notify your staff that one or more of its clients have licenses that
            could expire soon.
          </p>
        </div>
        <div className='mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-4  border-t border-gray-200    lg:mx-0 lg:max-w-none lg:grid-cols-4'>
          {cards.map((card) => (
            <Card card={card} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default EmailSender
