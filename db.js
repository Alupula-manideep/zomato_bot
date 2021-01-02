const { response } = require('express');
const express = require('express');
const app = express.Router();
const http = require("http");
const bodyParser = require("body-parser")

var mysql = require('mysql');


app.use(bodyParser.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database:"db",
  port: "3306"
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected")
})

app.get('/data',(req,res)=>{
    let query = "SELECT * FROM food WHERE type = 'sweet'"
    con.query(query,(err,rows)=>{
        if (!err){ 
            res.send(rows)
        }
        else{
            res.send(err)
        }
        console.log('yyyyy',err)
        res.send(rows)
    })

})





app.get('/nonveg',(req,res)=>{
    let query = "SELECT * FROM food WHERE type = 'nonveg'"
    con.query(query,(err,rows)=>{
        if(!err){
            res.send(rows)
        }
        else {
            res.send(err)
        }
    }) 
})

app.get('/veg',(req,res)=>{
    let query = "SELECT * FROM food WHERE type = 'veg'"
    con.query(query,(err,rows)=>{
        if(!err){
            res.send(rows)
        }
        else{
            res.send(err)
        }
    }) 
})
app.get('/sweets',(req,res)=>{
    let query = "SELECT * FROM food WHERE type = 'sweet'"
    con.query(query,(err,rows)=>{
        console.log('jejfejf',rows.length)
        if(!err && rows.length > 0){
            res.send(rows)
        }
        else{
            console.log('err',err)

            res.send(err)
        }
    })
})
app.get('/chocolate',(req,res)=>{
    let query = "SELECT * FROM food WHERE type = 'chocolate'"
    con.query(query,(err,rows)=>{
        if(!err){
            res.send(rows)
            
        }
        else{
            res.send(err)
        }
    })
})
app.get('/juice', (req, res) => {
    let query = "SELECT * FROM food WHERE type = 'juice'"
    con.query(query,(err,rows)=>{
        if(!err){
            res.send(rows)
    }
    else{
        res.send(err)
    }
})
})


app.post('/user',(req,res)=>{
    let body={
        user_name:req.body.user_name,
        mobile:req.body.mobile,
        Email:req.body.Email,
        gender:req.body.gender
    }

    console.log('body',body)
    let query = "INSERT INTO `users` SET ?"
    
    con.query(query,body,(err,rows)=>{
        console.log("query",query)
        if(!err){
            res.send(rows)
        }
        else{
            res.send(err)
        }
    })
})
app.post('/select_user',(req,res)=>{
    let body = {
       user_name:req.body.user_name
    }
    let query =  "SELECT * FROM `users` WHERE ?"
    con.query(query,body,(err,rows)=>{
        if(!err){
            res.send(rows)
        }
    })
})


app.get('/chatdata',(req,res)=>{
    let query = "SELECT * FROM chathistory"
    con.query(query,(err,rows)=>{
        console.log("dkskdska",query)
        if(err){ throw err;
        }else{
            res.send(rows)

        }
    })
})

app.post('/chathistory',(req,res)=>{
    let chat = req.body.chat
    let body ={
        username:req.body.username,
        chat:JSON.stringify(chat)

    }
    let query = 'INSERT INTO `chathistory` SET ?'
    con.query(query,body,(err,rows)=>{
        console.log("hfaihfilahifl",query)
        if (err){ throw err;
        }else{
        res.send(rows)
    
        }
    })
})

// app.put('/updateChat', (req, res) => {


// });


module.exports = app





