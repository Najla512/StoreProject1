import express, { Request, Response } from 'express'
import {order,OrderStore } from '../models/orders'
import jwt from 'jsonwebtoken'
const store = new OrderStore()

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
  try{
   const user = await store.show(req.query.id as string)
   var token=jwt.sign({user}, process.env.TOKEN_SECRET!);
   res.json(token)
  } catch(err) {
    res.status(500)
    res.json(err)
}
}

const CreatOrder= async (req:Request,res:Response)=>{

  try{
    const o: order = {
      product_id:req.query.product_id as string,
      quantity:req.query.quantity as string,
      user_id:req.query.order_id as string, 
      status:'active'

    }
    const neworder = await store.addOrder(o)
    var token=jwt.sign({o:neworder}, process.env.TOKEN_SECRET!);

  res.json(token)
 }catch(err){
  res.status(500)
  res.json(err)
 }
}

const showComplete = async (req: Request, res: Response) => {
  try {
    
     
  const user = await store.showComplete(req.query.id as string,"'complete'")


  res.json(user)
} catch(err) {
  res.status(500)
  res.json(err)
}
        
}


const OrderRoutes = (app: express.Application) => {
  app.get('/orders', index)
  app.get('/order', show)
  app.get('/orderComplete',showComplete)
  app.post('/CreatOrder',CreatOrder)

}

export default OrderRoutes