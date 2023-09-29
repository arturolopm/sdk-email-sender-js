import { Request, Response } from 'express'

export const getAllUsers = (req: Request, res: Response) => {
  res.json({
    msg: 'getUsers'
  })
}

export const getOneUser = (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    msg: 'getOneUser',
    id
  })
}

export const createUser = (req: Request, res: Response) => {
  const { body } = req
  res.json({
    msg: 'createUser',
    body
  })
}
export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    msg: 'deleteUser',
    id
  })
}
export const editUser = (req: Request, res: Response) => {
  const { id } = req.params
  res.json({
    msg: 'editUser',
    id
  })
}
