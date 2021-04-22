const {Router} = require('express')
const Note = require('../models/note')
const router = Router()
import notes from '../controllers/noteController'

router.get('/main', notes.getNotes)

router.get('/nest', notes.getNestNotes)

router.post('/add', notes.create)

router.delete('/delete', notes.remove)


// router.put('/replace', async(req, res)=>{
//     try {
//         const moveItem = await Note.replaceOne({_id: req.body._id},{title: req.body.title, parentId: req.body.parentId})
//         const moveItem1 = await Note.replaceOne({_id: req.body._id1}, {title: req.body.title1, parentId: req.body.parentId1})

//         res.json(moveItem)
        
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = router
