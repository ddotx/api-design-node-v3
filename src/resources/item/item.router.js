import { Router } from 'express'

//TODO == Mocking Controller
const controller = (req,res) => {
    res.send({message: "Hi, I'm controller"})
}

const router = Router()

router.route('/')
.get(controller)
.post(controller)

router.route('/:id')
.get(controller)
.put(controller)
.delete(controller)

export default router
