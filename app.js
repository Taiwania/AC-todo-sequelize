// Import patches
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const usePassport = require('./config/passport')
const passport = require('passport')
const app = express()

// Set the port
const PORT = 3000
const router = require('./routes')

// Import database and models
const db = require('./models')
const Todo = db.Todo
const User = db.User

// Use the patches
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(
  session({ secret: 'keyboard cat', resave: false, saveUninitialized: true })
)
usePassport(app)

// Routes
app.use(router)

// Listener
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
