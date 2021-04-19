const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const notesRoutes = require('./routes/notes')
const path = require('path')



const PORT = process.env.PORT || 4000

const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(notesRoutes)
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

async function start(){
  try {
    await mongoose.connect(
      'mongodb+srv://kirill:cubex@cluster0.a7s4s.mongodb.net/nested-list',
    {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(PORT, ()=>{
    console.log('start');
  })
  } catch (error) {
    console.log(error);
  }
}

start()


