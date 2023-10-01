import { Request, Response } from 'express'
import User from '../models/user'

export const getAllUsers = async (req: Request, res: Response) => {
  const responseItem = await User.findAll()
  res.json(responseItem)
}

export const getOneUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const responseItem = await User.findByPk(id)
  if (responseItem) {
    res.json(responseItem)
  } else {
    res.status(404).json({
      message: 'User not found'
    })
  }
}

export const createUser = async (req: Request, res: Response) => {
  const { body } = req
  try {
    const alreadyExist = await User.findOne({
      where: {
        email_address: body.email_address
      }
    })
    if (alreadyExist) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    const user = await User.create(body)
    await user.save()
    res.status(200).json({
      message: 'User created successfully',
      user
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'Error creating user',
      error: error
    })
  }
}
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    msg: 'deleteUser pending route',
    id
  })
}
export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req
  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    } else {
      await user.update(body)
      res.status(200).json({
        message: 'User updated',
        user
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating user'
    })
  }
}
