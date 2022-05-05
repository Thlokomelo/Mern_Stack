import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

const app = express()                       //initialises the web server
app.use(cors())                             //We attach the cors and express.json middleware that express will use
app.use(express.json())
app.use("/api/v1/movies", movies)           //initialises the route
app.use('*', (req,res)=>{                   //arrow function => (request and response are parameters)
 res.status(404).json({error: "not found"})
})

export default app   //makes the code importable
