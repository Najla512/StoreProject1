import express, { Request, Response } from 'express'
import {product,ProductStore } from '../models/products'
import jwt from 'jsonwebtoken'
const store = new ProductStore()

const index = async (_req: Request, res: Response) => {

  try {
  const users = await store.index()
  res.json(users)
} catch(err) {
  res.status(500)
  res.json(err)
}
}

const show = async (req: Request, res: Response) => {
  try {
   const user = await store.show(req.query.id as string)
   res.json(user)
  } catch(err) {
    res.status(500)
    res.json(err)
}
}

const create = async (req: Request, res: Response) => {
    try {
        const p: product = {
          name:req.query.name as string,
          price:req.query.price as string, 
          image:req.query.image as string
        }
        const newuser = await store.addProduct(p)
        var token=jwt.sign({newuser}, process.env.TOKEN_SECRET!);
res.json(token)
      
    } catch(err) {
        res.status(500)
        res.json(err)
    }
}



const ProductRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/product', show)
 app.post('/product', create)
}

export default ProductRoutes