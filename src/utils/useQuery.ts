import { createConnection } from "mysql"

function useQuery(query: string) {
  const connection = createConnection({
    host: process.env.MYSQLHOST,
    database: process.env.MYSQLDATABASE,
    port: parseInt(process.env.MYSQLPORT),
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
  })

  connection.connect()
  connection.query(query, (error, results) => {
    if (error) throw error
    return results[0]
  })
  connection.end()
}

export default useQuery
