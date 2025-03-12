import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectDb} from './db.js'
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import path from 'path'

dotenv.config()
const app = express()

const PORT = process.env.PORT || 2025

const __dirname = path.resolve()

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}))
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    connectDb()
    console.log(`The server is running on port ${PORT}`)
})