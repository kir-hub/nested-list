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
    position:{
        type: Number,
        required: false
    }
    
    
})



module.exports = model('Note', NoteSchema)