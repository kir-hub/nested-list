import mongoose from 'mongoose';
const Note = require('../models/note')

exports.getNotes = async(req, res)=>{
    try {
        const notes = await Note.find({})
        res.json(notes)
    } catch (error) {
        console.log(error);
    }
};

exports.getNestNotes = async(req, res)=>{
    try{
        const nestNotes = await Note.find({parentId: /./i})
        res.json(nestNotes)
    }catch(err){
        console.log(err);
    }
};

exports.create = async(req, res) =>{
    try {
        const newNote = new Note({
        title: req.body.title,
        parentId: req.body.parentId,
    })
        newNote.save()
        res.json({
            success: true,
            message: `Successfully added! ${newNote}`,
        })
    } catch (error) {
        console.log(error);
    }
};

exports.remove = async(req, res)=>{
    try {
        const noteToDel = await Note.find({_id: req.body._id})
        const removedNote = await Note.deleteOne({_id: req.body._id})
        const removedSublist = async (rm)=>{
            const note = await Note.find({parentId: rm[0]._id})
            const rmNote = await Note.deleteOne({_id: note[0]._id})
            if(note[0]._id){
                const noteToDel = await Note.find({parentId: note[0]._id})
                await removedSublist(noteToDel) 
            } }
        await removedSublist(noteToDel)
        res.json(removedNote)
    } catch (error) {
        console.log(error);
    }
};




