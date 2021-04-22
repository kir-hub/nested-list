const {Router} = require('express')
const Note = require('../models/note')
const router = Router()
import notes from '../controllers/noteController'

router.get('/main', notes.getNotes)

router.get('/nest', notes.getNestNotes)

router.post('/add', notes.create)

router.delete('/delete', notes.remove)

module.exports = router
