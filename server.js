// nodemon server.js -e js, hbs

const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

let app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// middleware
// creates server.log
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} ${req.url}`

  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
})

// Root Route:
app.get('/', (request, response) => {
  // response.send('<h1>hello, world!</h1>')
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: "Yo welcome to da site"
  })
})

app.get ('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Project'
  })
})

// another route:
app.get('/about', (req, resp) => {
  resp.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

// create route to /bad
// send back JSON w errorMessage ('unable to handle request')
app.get('/bad', (req, resp) => {
  resp.send({
    errorMessage: 'unable to handle request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
