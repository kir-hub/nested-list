const {Schema, model}  = require('mongoose') 

const NoteSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    parentId:{
        type: String,
        required: false
    },
})



module.exports = model('Note', NoteSchema)