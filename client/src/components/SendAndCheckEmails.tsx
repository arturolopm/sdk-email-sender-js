import CheckEmails from './CheckEmails'
import EmailSender from './EmailSender'

const SendAndCheckEmails: React.FC = () => {
  return (
    <>
      <EmailSender />
      <CheckEmails />
    </>
  )
}

export default SendAndCheckEmails
