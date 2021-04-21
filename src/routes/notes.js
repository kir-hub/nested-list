const {Router} = require('express')
const Note = require('../models/note')
const router = Router()
const db = require('../db/db')

router.get('/main', async(req, res)=>{
    try {
        const notes = await Note.find({})
        res.json(notes)
    } catch (error) {
        console.log(error);
    }
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
    try {
        const allNotes = await Note.find({})
        const newNote = new Note({
        title: req.body.title,
        parentId: req.body.parentId,
        position: req.body.position//!req.body.parentId ? (!allNotes.length ? 0 : allNotes[allNotes.length - 1].position + 1) : null
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
        const removedNote = await Note.deleteOne({_id: req.body._id})
        
        res.json(removedNote)
    } catch (error) {
        console.log(error);
    }
})


router.put('/replace', async(req, res)=>{
    try {
        const moveItem = await Note.replaceOne({_id: req.body._id},{title: req.body.title, parentId: req.body.parentId})
        const moveItem1 = await Note.replaceOne({_id: req.body._id1}, {title: req.body.title1, parentId: req.body.parentId1})

        res.json(moveItem)
        
    } catch (error) {
        console.log(error);
    }
})

module.exports = router
