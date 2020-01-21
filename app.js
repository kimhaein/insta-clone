import express from 'express'
import session from  'express-session'
import morgan from 'morgan'
import helmet from 'helmet'
import passport from 'passport'
import flash from  'connect-flash'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

import { localsMiddleware, passportMiddleware} from "./middlewares";

import mainRouter from './routers/MainRouter'
import userRouter   from './routers/UserRouter'
import contenRouter from './routers/ContnentRouter'
import routes from './routes'

// 기본 셋팅 
const app = express()
app.set('view engine', 'pug')
app.use(helmet())
app.use("/static", express.static("static"));
app.use("/uploads", express.static("uploads"));

app.use(flash());
app.use(session({ secret: '!@!@123!@', resave: true, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// 미들웨어
app.use(localsMiddleware,passportMiddleware)

// 라우터
app.use(routes.HOME,mainRouter)
app.use(routes.USERS, userRouter)
app.use(routes.CONTENTS, contenRouter)

export default app