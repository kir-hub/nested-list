import {$host} from './index'
import qs from 'qs'

export const moveNote = async (idMove, titleMove, idReplace, titleReplace)=>{
    const response = await $host.put('/notes/replace', { data : {_id: idMove, title: titleMove , id1: idReplace,  title1: titleReplace}})
    return response
}

export const deleteNote = async (id)=>{
    const response = await $host.delete('/notes/delete', {data: {_id: id}})
    return response
}

export const addNote = async (title,  parentId, position ) => {
    const response = await $host.post('/notes/add', {title: title,  parentId: parentId, position: position})
    return response
}


export const getNotes = async ()=>{
    const response = await $host.get('/notes/main')
    return response.data
}

export const getNestNotes = async ()=>{
    const response = await $host.get('/notes/nest')
    return response
}