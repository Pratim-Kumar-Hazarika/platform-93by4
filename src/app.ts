import dotenv from 'dotenv'
dotenv.config()
import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from './config/corsOptions'
import log from './utils/logger'
import { makeConnection } from './db/mongodb'
import authRoutes from './routes/AuthRoutes'
import studentRoutes from './routes/StudentRoutes'
import reviewerRoutes from './routes/ReviewerRoutes'
dotenv.config()

makeConnection()

const app: Application = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

/**
 * test route
 */
app.get('/', (req, res) => {
  res.json({ success: true })
})

/**
 * Route Configuration
 * */
app.use('/api/auth', authRoutes)
app.use('/api', studentRoutes)
// app.use('/api/admin', adminRoutes)
app.use('/api/reviewer', reviewerRoutes)

/**
 * This handles all the errors in application that were not catched by controllers
 * */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    log.error(err.stack)
  }

  res.status(500).json({
    message: err.message,
  })
})
/**
 * Boots the app on PORT mentioned in .env
 * */
// if (process.env.NODE_ENV === 'development') {
//   app.listen(process.env.PORT, () => {
//     log.info(`[server] ->🚀 started on ${process.env.PORT}`)
//     log.info(
//       `[${process.env.NODE_ENV}] -> http://localhost:${process.env.PORT}`
//     )
//   })
// }

/**
 * This helps us debug better incase of unhandledRejection of any promise.
 * */
process.on('unhandledRejection', (error: Error) => {
  log.error(`❎ unhandledRejection : ${error} \n ErrorStack : ${error.stack}`)
})

/**
 * Any exception we forgot to catch will be logged here.
 * */
process.on('uncaughtException', (error: Error) => {
  log.error(`❎ uncaughtException :  ${error.stack}`)
})

export = app
