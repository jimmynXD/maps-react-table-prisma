import express from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2'
dotenv.config()

const app = express()
const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.end()

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' })
})
app.listen(3001, () => {
  console.log('App is running')
})
