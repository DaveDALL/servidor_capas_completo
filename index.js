import express from 'express'
import http from 'http'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import handlebars from 'express-handlebars'
import passport from 'passport'
import { Server } from 'socket.io'
import initializePassportGit from './config/passportGit.config.js'
import initializePassportJwt from './config/passportJwt.config.js'
import mongoManager from './src/db/mongo.connect.manager.js'
import CONFIG from './config/config.env.js'
import productRouter from './src/routers/products.router.js'
import cartRouter from './src/routers/carts.router.js'
import viewsRouter from './src/routers/views.router.js'
import authRouter from './src/routers/auth.router.js'
import githubRouter from './src/routers/github.router.js'
import userRouter from './src/routers/user.router.js'
import chatRouter from './src/routers/chat.router.js'
import __dirname from './dirPath.js'
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const { PORT,  MONGO_URL, SECRET } = CONFIG

//middleware de archivos estaticos publicos, JSON y encoding
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Configuracion de Handlebars
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', `${__dirname}/views`)

//Configuración de express session y almacenamiento en MongoDB
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true
}))

//inicializar passport
app.use(passport.initialize())
initializePassportGit()
initializePassportJwt()

//middleware de router
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/', viewsRouter)
app.use('/api/users', userRouter)
app.use('/chat', chatRouter(io))

//Auth Routers
app.use('/', authRouter)
app.use ('/auth', githubRouter)


server.listen(PORT, () => {
    console.log(`Server Runnig at port ${PORT}`)
    mongoManager.connect()
})
