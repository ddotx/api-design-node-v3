import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

//TODO === Sub Routes
const router = express.Router()

app.disable('x-powered-by')

//*vvv === Middleware
//! === Middleware will run sequentially not parallel
app.use(cors())
app.use(json()) //?==> parse JSON response to JS Object
app.use(urlencoded({ extended: true })) //?==> query string, param on url
app.use(morgan('dev')) //?==> logging on terminal

//TODO === Custom Middleware
//? Middleware = list of functions that execute,in order,before controllers | Great for authenticating, transforming the request, tracking, error handling ===
const log = (req,res,next)=>{
    console.log('logging')
    req.mydata = 'injected value from middleware'
    //throw new Error('return 500')
    next()
}

//app.use(log) //?==> run on everything

//*===Sub-routing
router.get('/me/*',(req,res)=>{ //* path with glob-wildcard
    res.send({ me: 'send from router'})
})
app.use('/api',router)

//TODO === CRUD
app.get('/',(req,res)=>{ //?==> controller function
    res.send({message: 'get test'})
})

app.post('/', (req, res) => {
    console.log(req.body)
    //console.log(req.mydata)
    res.send({ message: 'post ok' })
})

app.get('/data', [log, log], (req,res)=>{
    res.send({data:[1,2,3]})
})

app.post('/data',log, (req,res)=>{
    // res.send(req.body)
    res.send({data: req.mydata}) //* req.mydata FROM middleware
    // res.send({ok:true})
})


export const start = () => {
    app.listen(3000, ()=>{
        console.log('server is running on 3000')
    })
}
//TODO: === Start with 'yarn dev' OR 'npm run dev' ===
