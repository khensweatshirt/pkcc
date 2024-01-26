const fs = require("fs")
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 4000

const User = require("./model/review")

app.use(express.urlencoded({extended: true}))

mongoose.connect("mongodb://127.0.0.1:27017/reviews").
then(()=>{
    console.log("Database Connected")
}).catch((e)=>{
    console.log(e)
    console.log("Database Can't Be Connected")
})

app.post("/", async(req, res)=>{
    const userData = new User(req.body)
    await userData.save()
    let a = fs.readFileSync("submit.html")
    res.send(a.toString())
})

app.get("/", (req, res)=>{
    let a = fs.readFileSync("review-form.html")
    res.send(a.toString())
})

app.listen(port, ()=>{
    console.log("App Running on port: ", port)
})