import client from '../database'


export type order = {
  product_id:string;
    quantity: string;
    user_id: string;
    status:string;

}

export class OrderStore {
  async index(): Promise<order[]> {
    try {
      // @ts-ignore
      
      const sql = 'SELECT * FROM orders'
      const conn = await client.connect()
      const result = await conn.query(sql)

      conn.release()

      return result.rows 
    } catch (err) {
      console.log(err);
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<order> {
    try {
      console.log("show my order: "+id)
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }
  async showComplete(id: string,status:string): Promise<order> {
    const st='complete';

    try {
    const sql = "SELECT * FROM orders WHERE user_id=($1) AND status=($2)"
      console.log(status);
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id,status])

    conn.release()

    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
  }
  async addOrder(o: order): Promise<order> {
    try {
      const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES($1, $2, $3,$4) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn
          .query(sql, [o.product_id,o.quantity, o.user_id,o.status])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(`Could not add product ${o.product_id} to order ${o.user_id}: ${err}`)
    }
  }
 

  async delete(id: string): Promise<order> {
      try {
        console.log("insade delete")
    const sql = 'DELETE FROM orders WHERE id=($1)'
    // @ts-ignore
    const conn = await client.connect()

    const result = await conn.query(sql, [id])

    const user = result.rows[0]

    conn.release()

    return user
      } catch (err) {
        console.log("insade delete 99")
          throw new Error(`Could not delete order ${id}. Error: ${err}`)
      }
  }
}