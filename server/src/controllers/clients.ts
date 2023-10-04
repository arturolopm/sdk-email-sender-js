import { Request, Response } from 'express'
import Client from '../models/client'

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll()
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: 'Error getting clients', error: error })
  }
}

export const getOneClient = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const client = await Client.findByPk(id)
    if (client) {
      res.json(client)
    } else {
      res.status(404).json({ message: 'Client not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error getting client' })
  }
}

export const createClient = async (req: Request, res: Response) => {
  const { body } = req
  try {
    const alreadyExists = (await Client.findOne({
      where: { poc_email: body.poc_email }
    })) as any
    if (alreadyExists) {
      return res
        .status(400)
        .json({ message: `Client already exist with id ${alreadyExists.id}` })
    }
    const client = await Client.create(body)
    await client.save()
    res.status(200).json({ message: 'Client created successfully', client })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error creating client' })
  }
}

export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Client.destroy({ where: { id } })
    res.status(200).json({ message: 'Client deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client' })
  }
}

export const editClient = async (req: Request, res: Response) => {
  const { id } = req.params
  const { body } = req
  try {
    const client = await Client.findByPk(id)
    if (!client) {
      return res.status(404).json({ message: 'Client not found' })
    } else {
      await client.update(body)
      res.status(200).json({ message: 'Client updated', client })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating client' })
  }
}
