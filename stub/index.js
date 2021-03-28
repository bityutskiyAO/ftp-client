const express = require('express')

const app = express()
const routes = require('./routes')

const PORT = 5000
const HOST = 'localhost'
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))

app.use('/api', routes)

app.listen(PORT, HOST, () => {
    console.log('Server running at port: ', PORT)
})
