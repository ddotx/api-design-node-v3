import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

// /api/item
router
  .route('/')
  // .get((req,res,next)=>{
  //   res.status(404).json({message:'hello'})
  // })
  .get(controllers.getOne)
  .post(controllers.createOne)

// /api/item/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

export default router
