import express, { Request, Response } from 'express'
import {user, UserStore} from '../models/users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const store = new UserStore()
//var jwt = require('jsonwebtoken');
const index = async (_req: Request, res: Response) => {
  try{
  const users = await store.index()
  const f=jwt.sign({users}, process.env.TOKEN_SECRET!)
  res.json(f)
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

const create = async (req: Request, res: Response) => {
    try {
        const u: user = {
          firstname:req.query.firstname as string,
          lastname:req.query.lastname as string,
            password:req.query.password as string,
        }
console.log(u)
        const newuser = await store.create(u)
        var token=jwt.sign({u:newuser}, process.env.TOKEN_SECRET!);
res.json(token)
    } catch(err) {
        res.status(500)
        res.json(err)
    }
}

const login = async (req: Request, res: Response) => {
  try {
      const u: user = {
        firstname:req.query.firstname as string,
        lastname:req.query.lastname as string,
          password:req.query.password as string,
      }
console.log(u)
      const newuser = await store.login(u)

//       var token=jwt.sign({u:newuser}, process.env.TOKEN_SECRET!);
// res.json(token)
  //    var token=jwt.sign({u:newuser}, process.env.TOKEN_SECRET!);
res.json(newuser);
  } catch(err) {
      res.status(500)
      res.json(err)
  }
}



const UserRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/user', show)
 app.post('/user', create)
 app.get('/login',login)

}

export default UserRoutes