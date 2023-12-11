import 'reflect-metadata'
import './di'
import express from 'express'
import platformRouter from './modules/platform/routes'

const app = express()

app.use(express.json())
app.use(platformRouter())


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})