import Client from '../database'


export type product = {
    name: string;
    price: string;
    image:string;


}

export class ProductStore {
  async index(): Promise<product[]> {
    try {
      // @ts-ignore

      const sql = 'SELECT * FROM products'
      const conn = await Client.connect()
      const result = await conn.query(sql)

      conn.release()
      console.log('insde show proucts')
      return result.rows 
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await Client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find products ${id}. Error: ${err}`)
    }
  }

  async addProduct(p: product): Promise<product> {
    try {
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
      //@ts-ignore
      const conn = await Client.connect()

      const result = await conn
          .query(sql, [p.name,p.price])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${p.name}: ${err}`)
    }
  }
 

  async delete(id: string): Promise<product> {
      try {
        console.log("insade delete")
    const sql = 'DELETE FROM products WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
        console.log("insade delete 99")
          throw new Error(`Could not delete product ${id}. Error: ${err}`)
      }
  }
}