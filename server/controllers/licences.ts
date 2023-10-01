import { Request, Response } from 'express'
import License from './../models/license'
import User from '../models/user'
import { addMonths, addWeeks, isDay } from '../utils/utils'
import Client from '../models/client'
import { ClientAttributes, LicenseAttributes } from '../types/types'

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
    const fourMonthsLater = addMonths(new Date(), 4)
    const formattedFourMonthsLater = fourMonthsLater.toISOString().slice(0, 10)

    const licenses = await License.findAll({
      where: {
        expiration_datetime: formattedFourMonthsLater
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
    return res.json({ responseItem })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}

export const sendEmailOnehMonthLicenseAndIsMonday = async (
  req: Request,
  res: Response
) => {
  try {
    const oneMonthLater = addMonths(new Date(), 1)
    const formattedOneMonthsLater = oneMonthLater.toISOString().slice(0, 10)
    const isMonday = isDay(new Date(), 1)
    if (!isMonday) {
      return res.status(404).json({
        message: 'Today is not a Monday, emails not sent'
      })
    }

    const licenses = await License.findAll({
      where: {
        expiration_datetime: formattedOneMonthsLater
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
    return res.json({ responseItem })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}

export const sendEmailOneWeekLicense = async (req: Request, res: Response) => {
  try {
    const oneWeekLater = addWeeks(new Date(), 1)
    const formattedOneWeekLater = oneWeekLater.toISOString().slice(0, 10)

    const licenses = await License.findAll({
      where: {
        expiration_datetime: formattedOneWeekLater
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
    return res.json({ responseItem })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error })
  }
}
