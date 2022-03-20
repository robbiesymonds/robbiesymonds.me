import { createConnection } from "mysql2"

async function useQuery<T>(query: string, data: Array<any> = []): Promise<T> {
  return new Promise((resolve, reject) => {
    const connection = createConnection({
      host: process.env.MYSQLHOST,
      database: process.env.MYSQLDATABASE,
      port: parseInt(process.env.MYSQLPORT),
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
    })

    connection.connect()

    connection.query(query, data, (e, r) => {
      if (!e) resolve(r as unknown as T)
      else reject(e)
    })

    connection.end()
  })
}

export default useQuery
