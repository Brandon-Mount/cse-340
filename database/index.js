const { Pool } = require("pg")
require("dotenv").config()

/* ***************
 * Connection Pool
 * Uses SSL on Render (production), no SSL locally
 * *************** */
let pool

if (process.env.NODE_ENV === "development") {
  // Local dev
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  })

  // Helpful query logger for dev
  module.exports = {
    async query(text, params) {
      try {
        const res = await pool.query(text, params)
        console.log("executed query", { text })
        return res
      } catch (error) {
        console.error("Database query error:", error)
        throw error
      }
    },
  }
} else {
  // Render production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // Required by Render
    },
  })

  module.exports = {
    query: (text, params) => pool.query(text, params),
  }
}
