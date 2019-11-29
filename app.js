import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-Parser'

import globalRouter from './routers/GlobalRouter'
import userRouter   from './routers/UserRouter'
import routes from './routes'

// 기본 셋팅 
const app = express()
app.set('view engine', 'pug')
app.use(helmet())
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(routes.HOME, globalRouter)
app.use(routes.USERS, userRouter)

export default app