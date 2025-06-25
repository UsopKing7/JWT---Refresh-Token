import express from 'express'
import { router } from './routes/isRoutes'
import { PORT } from './config/proces'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: true,
  credentials: true
}))

app.use('/api', router)

app.listen(PORT, '0.0.0.0', () => {
  console.table({
    URL: `http://localhost:${PORT}`
  })
})
