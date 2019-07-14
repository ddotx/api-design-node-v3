import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true, //? trim the space
            maxlength: 50
        },
        status:{
            type: String,
            required: true,
            enum: ['active','complete','pastdue'],
            default: 'active'
        },
        notes: String,
        due: Date,
        createdBy:{
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref:'user'
        },
        list: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'list'
        }
    },
    { timestamps: true }
)

//TODO - Compound Index ==> want to be unique per list (ensure all tasks in a list have unique names)
itemSchema.index({ list: 1, name: 1}, {unique: true})

export const Item = mongoose.model('item', itemSchema)
