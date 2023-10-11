const { Schema, model } = require("mongoose")

const memorySchema = new Schema({

    create: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    gallery: {
        type: String,
        required: true
    },
    tags: { 
        type: [String],
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

const Memory = model('memories', memorySchema)
    
module.exports = Memory