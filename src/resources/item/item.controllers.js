import {item, Item} from './item.model'
import mongoose from 'mongoose'
import {connect} from '../../utils/db'

const run = async () =>{
    await connect('mongodb://localhost:27017/api-test') //!any db string url
    const item = await Item.create({
        name: 'Clean up',
        createdBy: mongoose.Types.ObjectId(), //!fake
        list: mongoose.Types.ObjectId() //!fake
    })

    console.log(item)
}

run()