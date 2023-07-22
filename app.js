// Import patches
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()

// Set the port
const PORT = 3000

// Use the patches
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// Routes
app.get('/', (req, res) => {
  res.send('hello world')
})

// Listener
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})