import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER || 'carturolopezm@gmail.com',
    pass: process.env.EMAIL_PW || 'ypks klpo ukso qafp'
  }
})
transporter.verify().then(() => {
  console.log('ready to send emails')
})
