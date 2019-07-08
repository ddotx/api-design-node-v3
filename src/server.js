import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json()) //?==> parse response to json
app.use(urlencoded({ extended: true })) //?==> query string, param on url
app.use(morgan('dev')) //?==> logging on terminal

//TODO === Middleware
const log = (req,res,next)=>{
    console.log('logging')
    next()
}

//*===Sub-routing
router.get('/me',(req,res)=>{
    res.send({ me: 'send from router'})
})

app.use('/api',router)

//TODO === CRUD
// app.get('/',(req,res)=>{ //?==> controller function
//     res.send({message: 'get test'})
// })

app.get('/data', log, (req,res)=>{
    res.send({data:[1,2,3]})
})

// app.post('/',(req,res)=>{
//     console.log(req.body)
//     res.send({message: 'post ok'})
// })

app.post('/data',(req,res)=>{
    res.send({ok:true})
})


export const start = () => {
    app.listen(3000, ()=>{
        console.log('server is running on 3000')
    })
}
