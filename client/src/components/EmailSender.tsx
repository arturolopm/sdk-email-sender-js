const posts = [
  {
    id: 1,
    title: 'Send Licenses emails 4 months',
    href: '#',
    description:
      'Send email notification to the users who are point of contact of clients which licenses will expire in four months.',
    category: { title: 'Send now', href: '#' },
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
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Send now', href: '#' },
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
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Send now', href: '#' },
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
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Send now', href: '#' },
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
            From the blog
          </h2>
          <p className='mt-2 text-lg leading-8 text-gray-600'>
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className='mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-4  border-t border-gray-200    lg:mx-0 lg:max-w-none lg:grid-cols-4'>
          {posts.map((post) => (
            <article
              key={post.id}
              className='flex max-w-xl py-4 flex-col items-start justify-between px-2 shadow-md'>
              <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                  <div>
                    <span className='absolute inset-0' />
                    {post.title}
                  </div>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                  {post.description}
                </p>
              </div>
              <div className='flex self-end items-center  gap-x-4 text-xs'>
                {/* <time
                  dateTime={post.datetime}
                  className='text-gray-500'>
                  {post.date}
                </time> */}
                <button
                  //   href={post.category.href}
                  className='relative z-10 rounded-full bg-black px-3 py-1.5 font-medium text-white '>
                  {post.category.title}
                </button>
              </div>
              <div className=' mt-2 flex items-center gap-x-4'>
                <div className='text-sm leading-6'>
                  <p className='font-semibold text-gray-900'>
                    {post.emails_sent.name}
                  </p>
                  <p className='text-gray-700'>{post.emails_sent.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
export default EmailSender
