import express from 'express'
import jwt from 'jsonwebtoken'
const secretkey="secretkey"
const app=express();

app.get("/",(req,res)=>{
    res.json({
        mess:"hi"
    })
})

app.post("/login",(req,res)=>{
    const user={
        id:1,
        username:"anil",
        email:"a@gmail.com"
    }
    jwt.sign({user},secretkey,{expiresIn:"300s"},(err,token)=>{
      
        res.json({token})
    })
})

app.post("/profile",verifytoken,(req,res)=>{
   jwt.verify(req.token,secretkey,(err,authdata)=>{
    if(err){
        res.send({
            result:"invalid token"
        })
    }else{
        res.json({
            mess:"profile access",
            authdata
        })
    }
   })
})

function verifytoken(req,res,next){

    const bearerheader=req.headers['Authorization']
    if(typeof bearerheader !== 'undefined'){
        const bearer=bearerheader.split(" ");
        const token=bearer[1]
        req.token=token;
        next()

    }else{
        res.send({
            result:"not valid"
        })
    }
}




app.listen(5000,()=>{

    console.log("app is running on port 5000")

})









//npm init
//npm i express
//npm i jsonwebtoken