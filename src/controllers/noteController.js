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
        const noteToDel = await Note.find({_id: req.body._id})//находит элемнт по которому кликают
        const removedNote = await Note.deleteOne({_id: req.body._id})// удаляет элемент по которому кликнули
        const removeById = async (id) => {
            await Note.deleteOne({_id: id})
            const noteToDel = await Note.find({parentId: id})
            // removeById(Note.find({_id: req.body._id}))
            for(let i = 0; i < noteToDel.length; i++){
                removeById(noteToDel[i].id)
            }
        }
        removeById(noteToDel[0]._id)

        // const func = async(arr)=>{
        //     arr.map(async(i,index)=>{
        //         const note = await Note.find({parentId: i._id})
        //         const del = await Note.deleteMany({parentId: i._id})
        //         if(note.length){await func(note)}
        //     })
        // }
        // func(noteToDel) 
        res.json(removedNote)
    } catch (error) {
        console.log(error);
    }
};




