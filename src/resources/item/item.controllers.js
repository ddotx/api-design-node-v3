import {item, Item} from './item.model'
import mongoose from 'mongoose'
import {connect} from '../../utils/db'

//TODO==> Controller perform CRUD on the models based on the routes + verbs.
const run = async () =>{
    await connect('mongodb://localhost:27017/api-test') //!any db string url

    //TODO==> C === model.create(), new model()
    const item = await Item.create({
        name: 'Clean up',
        createdBy: mongoose.Types.ObjectId(), //!fake
        list: mongoose.Types.ObjectId() //!fake
    })

    console.log(item)

    //TODO==> R === model.find(), model.findOne(), model.findById()
    // console.log(await Item.findById(item._id).exec())  //*==>exec will turns it into a real promise and tell DONE.

    //TODO==> U === model.update(), model.findByIdAndUpdate(), model.findOneAndUpdate()
    const updated = await Item.findByIdAndUpdate(
        item._id,
        { name: 'new name'},
        { new: true} //*==> return Updated item
    ).exec()

    console.log(updated)

    //TODO==> D === model.remove(), model.findByIdAndRemove(), model.findOneAndRemove()
    const remove = await Item.findByIdAndRemove(item._id).exec()
    
    console.log(remove)

}

run()