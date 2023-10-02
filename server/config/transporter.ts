import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER || 'afinichallenge@gmail.com',
    pass: process.env.EMAIL_PW || 'enwb nekx owix vxsw'
  }
})
transporter.verify().then(() => {
  console.log('ready to send emails')
})
