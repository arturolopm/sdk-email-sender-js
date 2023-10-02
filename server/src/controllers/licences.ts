import { Request, Response } from 'express'
import License from '../models/license'
import User from '../models/user'
import {
  addWeeks,
  getDataLicensesOneMonthAndIsMonday,
  getDataLicensesOneWeek,
  getDataSendEmailsFourMonths,
  isDay,
  sendMail
} from '../utils/utils'
import Client from '../models/client'
import { ClientAttributes, LicenseAttributes } from '../types/types'
import { emailTemplate } from '../templates/emailTemplate'
import Email from '../models/email'

export const getAllLicenses = async (req: Request, res: Response) => {
  const responseItem = await License.findAll()
  res.json(responseItem)
}

export const getOneLicense = async (req: Request, res: Response) => {
  const { id } = req.params
  const responseItem = await License.findByPk(id)
  if (responseItem) {
    res.json(responseItem)
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
}

export const createLicense = async (req: Request, res: Response) => {
  const { body } = req
  const users = await User.findAll()
  if (!users) {
    return res.status(400).json({
      message: 'can not create licenses without any user previously created'
    })
  }
  try {
    const license = await License.create(body)
    await license.save()
    res.status(200).json({
      message: 'License created successfully',
      license
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: error
    })
  }
}
export const deleteLicense = (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    msg: 'deleteLicense pending route',
    id
  })
}
export const editLicense = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req
  try {
    const license = await License.findByPk(id)
    if (!license) {
      return res.status(404).json({
        message: 'license not found'
      })
    } else {
      await license.update(body)
      res.status(200).json({
        message: 'license updated',
        license
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error
    })
  }
}

export const sendEmailFourthMonthsLicense = async (
  req: Request,
  res: Response
) => {
  try {
    const responseItem = (await getDataSendEmailsFourMonths()) as any[]

    const templates = responseItem.map((data) => {
      const mail = emailTemplate({
        license_id: data.licenseData.id,
        license_type: data.licenseData.license_type,
        package: data.licenseData.package,
        expiration_datetime: data.licenseData.expiration_datetime,
        poc_name: data.clientData.poc_name,
        poc_email: data.clientData.poc_email
      })
      return { data, mail }
    })
    templates.map((template) => {
      sendMail({
        to: template.data.adminData.email_address,
        template: template.mail
      })
    })
    res.status(200).json({ responseItem })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const sendEmailOnehMonthLicenseAndIsMonday = async (
  req: Request,
  res: Response
) => {
  try {
    const isMonday = isDay(new Date(), 1)

    const responseItem = isMonday
      ? ((await getDataLicensesOneMonthAndIsMonday()) as any[])
      : []
    if (responseItem.length > 0) {
      const templates = responseItem.map((data) => {
        const mail = emailTemplate({
          license_id: data.licenseData.id,
          license_type: data.licenseData.license_type,
          package: data.licenseData.package,
          expiration_datetime: data.licenseData.expiration_datetime,
          poc_name: data.clientData.poc_name,
          poc_email: data.clientData.poc_email
        })
        return { data, mail }
      })
      templates.map((template) => {
        sendMail({
          to: template.data.adminData.email_address,
          template: template.mail
        })
      })
    }
    res.status(200).json({ responseItem })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const sendEmailOneWeekLicense = async (req: Request, res: Response) => {
  try {
    const responseItem = (await getDataLicensesOneWeek()) as any[]

    if (responseItem.length > 0) {
      const templates = responseItem.map((data) => {
        const mail = emailTemplate({
          license_id: data.licenseData.id,
          license_type: data.licenseData.license_type,
          package: data.licenseData.package,
          expiration_datetime: data.licenseData.expiration_datetime,
          poc_name: data.clientData.poc_name,
          poc_email: data.clientData.poc_email
        })

        return { data, mail }
      })
      templates.map(async (template) => {
        sendMail({
          to: template.data.adminData.email_address,
          template: template.mail
        })
        const email = await Email.create({
          license_id: template.data.licenseData.id
        })
        await email.save()
      })
    }
    res.status(200).json({ responseItem })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const sendAllEmails = async (req: Request, res: Response) => {
  try {
    const fourMonths = (await getDataSendEmailsFourMonths()) as any[]
    const oneMonth = (await getDataLicensesOneMonthAndIsMonday()) as any[]
    const oneWeek = (await getDataLicensesOneWeek()) as any[]

    const responseItem = fourMonths.concat(oneMonth, oneWeek)

    if (responseItem.length > 0) {
      const templates = responseItem.map((data) => {
        const mail = emailTemplate({
          license_id: data.licenseData.id,
          license_type: data.licenseData.license_type,
          package: data.licenseData.package,
          expiration_datetime: data.licenseData.expiration_datetime,
          poc_name: data.clientData.poc_name,
          poc_email: data.clientData.poc_email
        })
        return { data, mail }
      })
      templates.map((template) => {
        sendMail({
          to: template.data.adminData.email_address,
          template: template.mail
        })
      })
    }
    res.status(200).json({ responseItem })
  } catch (error) {
    res.status(500).json({ error })
  }
}
export const getLastEmailsSent = async (req: Request, res: Response) => {
  try {
    const { lastx } = req.params // Assuming X is obtained from the request parameters

    // Find the last X email sent records
    const lastXEmailsSent = await Email.findAll({
      order: [['sent_at', 'DESC']], // Order by sent_at in descending order to get the latest first
      limit: parseInt(lastx) // Convert X to an integer to use as the limit
    })

    res.status(200).json(lastXEmailsSent)
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
