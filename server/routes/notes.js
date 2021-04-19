const {Router} = require('express')
const Note = require('../models/Note')
const router = Router()

router.get('/', async(req,res)=>{
    const notes = await Note.find({})
    res.render('index', {
        title: 'notes list',
        isIndex: true,
        notes
    })
})

router.get('/create', (req, res)=>{
    res.render('create', {
        title: 'create',
        isCreate: true
    })
})

router.get('/create', async (req, res) => {
    // const note = new Note({
        
    //   title: req.body.title
    // })
  
    // await note.save()
    // res.redirect('/')
    res.send('hello')
  })

module.exports = router