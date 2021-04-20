const {Router} = require('express')
const Note = require('../models/note')
const router = Router()

router.get('/main', async(req, res)=>{
    try {
        const notes = await Note.find({})
        res.json(notes)
    } catch (error) {
        console.log(error);
    }
    // Note.find({})
    // .then(result => res.json({ result: result}))
})

router.get('/nest', async(req, res)=>{
    try{
        const nestNotes = await Note.find({parentId: /./i})
        res.json(nestNotes)
    }catch(err){
        console.log(err);
    }
})

router.post('/add', async(req, res) =>{
    // const newNote = await Note.create
    try {
        const newNote = new Note({
        title: req.body.title,
        parentId: req.body.parentId,
        date: req.body.date
    })
        newNote.save()
        res.json({
            success: true,
            message: `Successfully added! ${newNote}`,
        })
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete', async(req, res)=>{
    try {
        // const removedNote = await Note.find({_id: req.body._id}).remove().exec()
        const removedNote = await Note.deleteOne({_id: req.body._id})
        res.json(removedNote)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router
