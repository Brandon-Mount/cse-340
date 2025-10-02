const { Pool } = require("pg")
require("dotenv").config()

// Always use SSL (works with Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
})

module.exports = {
  async query(text, params) {
    try {
      const res = await pool.query(text, params)
      return res
    } catch (error) {
      console.error("Database query error:", error)
      throw error
    }
  },
}
