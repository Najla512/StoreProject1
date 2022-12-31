import client from '../database';
import Client from '../database'
import bcrypt from 'bcrypt'
import { decode } from 'punycode';
//import { Client } from 'pg'

const saltRounds = 10 as unknown as string;
export type user = {
  firstname: string;
  lastname: string;
     password: string;

}

export class UserStore {
  async index(): Promise<user[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'

      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<user> {
    try {
 
    const sql = 'SELECT * FROM users WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
      console.log("error");

        throw new Error(`Could not find user Error: ${err}`)
    }
  }

  async create(u: user): Promise<user> {
    try {
      // @ts-ignore
      console.log("inside models");
      const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'
      const hash = bcrypt.hashSync(
        u.password , 
        parseInt(saltRounds)
     );
      const conn = await client.connect()
    
      const result = await conn.query(sql, [u.firstname,u.lastname, hash])


      conn.release()

      return result.rows[0]
    } catch(err) {
      console.log("inside error model")
      throw new Error(`unable create user (${u.firstname}): ${err}`)
    } 
  }

  async authenticate(username: string): Promise< | null> {
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE firstname=($1)'

    const result = await conn.query(sql, [username])

    //console.log(password+pepper)

    if(result.rows.length) {

      const user = result.rows[0]

      console.log(user)
return user;
     
    }

    return null
  }

  
  async login(u: user): Promise<any | null>  {
    let final='';
try{  
  const sql = 'SELECT password FROM users WHERE firstname=($1)' 
  
const conn = await client.connect()

const result = await conn.query(sql, [u.firstname])
conn.release();
//console.log(result.rows[0]['password']);
if( result.rows[0]!=null){
  const match = await bcrypt.compare(u.password, result.rows[0]['password']);

  if(match) {
    console.log(match);
     console.log('login true');
    final='true';
  }else{
     final='false'
    console.log('error login');
  }
}else {
  final='false'
}


return final;
}catch(err) {
 // console.log("inside error model")

  throw new Error(`unable create user (${u.firstname}): ${err}`)
} 
  

   
  }

}