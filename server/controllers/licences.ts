import { Request, Response } from 'express'
import License from './../models/license'
import { getAllUsers } from './users'
import User from '../models/user'

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
