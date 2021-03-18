const express = require('express')
const port = 3009
const app = express()
const routing = require('./routing')
const cors = require('cors')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use('/', routing)

app.listen(port, () => {
  console.log(`sudah connect ke port :${port}`)
})