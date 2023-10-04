import { transporter } from '../../config/transporter'
import { Sequelize, Op } from 'sequelize'
import License from '../models/license'
import { ClientAttributes, LicenseAttributes } from '../types/types'
import Client from '../models/client'
import User from '../models/user'
import dotenv from 'dotenv'
dotenv.config({ path: '../../.env' })

export const addMonths = (date: Date, months: number) => {
  date.setMonth(date.getMonth() + months)

  return date
}
export const addWeeks = (date: Date, weeks: number) => {
  const millisecondsInAWeek = 604800000 // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  const millisecondsToAdd = weeks * millisecondsInAWeek
  const updatedDate = new Date(date.getTime() + millisecondsToAdd)

  return updatedDate
}
export const isDay = (date: Date, day: number) => {
  return date.getDay() === day // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
}
export const getDataSendEmailsFourMonths = async () => {
  try {
    const fourMonthsLater = addMonths(new Date(), 4)
    const formattedFourMonthsLater = fourMonthsLater.toISOString().slice(0, 10)

    const licenses = await License.findAll({
      where: {
        expiration_datetime: {
          [Op.gte]: Sequelize.literal(`DATE('${formattedFourMonthsLater}')`),
          [Op.lt]: Sequelize.literal(
            `DATE('${formattedFourMonthsLater}') + INTERVAL 1 DAY`
          )
        }
      }
    })
    const promises = licenses.map(async (licence) => {
      const licenseData = licence.get() as LicenseAttributes
      const client = await Client.findByPk(licenseData.client_id)
      const clientData = client?.get() as ClientAttributes
      const admin_poc = await User.findByPk(clientData.admin_poc!)
      const adminData = admin_poc?.get()

      return { licenseData, clientData, adminData }
    })

    const responseItem = await Promise.all(promises)
    return responseItem
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getDataLicensesOneMonthAndIsMonday = async () => {
  try {
    const oneMonthLater = addMonths(new Date(), 1)
    const formattedOneMonthsLater = oneMonthLater.toISOString().slice(0, 10)

    const licenses = await License.findAll({
      where: {
        expiration_datetime: {
          [Op.gte]: Sequelize.literal(`DATE('${formattedOneMonthsLater}')`),
          [Op.lt]: Sequelize.literal(
            `DATE('${formattedOneMonthsLater}') + INTERVAL 1 DAY`
          )
        }
      }
    })
    const promises = licenses.map(async (licence) => {
      const licenseData = licence.get() as LicenseAttributes
      const client = await Client.findByPk(licenseData.client_id)
      const clientData = client?.get() as ClientAttributes
      const admin_poc = await User.findByPk(clientData.admin_poc!)
      const adminData = admin_poc?.get()

      return { licenseData, clientData, adminData }
    })

    const responseItem = await Promise.all(promises)
    return responseItem
  } catch (error) {
    console.log(error)
    return error
  }
}
export const getDataLicensesOneWeek = async () => {
  try {
    const oneWeekLater = addWeeks(new Date(), 1)
    const formattedOneWeekLater = oneWeekLater.toISOString().slice(0, 10)
    console.log(formattedOneWeekLater)

    const licenses = await License.findAll({
      where: {
        expiration_datetime: {
          [Op.gte]: Sequelize.literal(`DATE('${formattedOneWeekLater}')`),
          [Op.lt]: Sequelize.literal(
            `DATE('${formattedOneWeekLater}') + INTERVAL 1 DAY`
          )
        }
      }
    })
    console.log(licenses)

    const promises = licenses.map(async (licence) => {
      const licenseData = licence.get() as LicenseAttributes
      const client = await Client.findByPk(licenseData.client_id)
      const clientData = client?.get() as ClientAttributes
      const admin_poc = await User.findByPk(clientData.admin_poc!)
      const adminData = admin_poc?.get()

      return { licenseData, clientData, adminData }
    })

    const responseItem = await Promise.all(promises)
    return responseItem
  } catch (error) {
    console.log(error)
    return error
  }
}
interface SendMailParams {
  to: string
  template: string
}
export const sendMail = async ({ to, template }: SendMailParams) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_SENDER || 'afinichallenge@gmail.com',
      to: to,
      subject: 'License about to expire',
      // text:"hello there",
      html: template
    })
    return { sent: to }
  } catch (error) {
    console.log(error)
  }
}
