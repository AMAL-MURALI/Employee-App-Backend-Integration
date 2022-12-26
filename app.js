var express = require("express");
var Bodyparser = require("body-parser");
var Mongoose = require("mongoose");
var Cors = require("cors");
var { request } = require("express");
var { studentModel } = require("./model/employe");

var app = new express();

app.use(Bodyparser.json());
app.use(Bodyparser.urlencoded({extended:false}))

app.use(Cors());

Mongoose.connect("mongodb+srv://amal:crow009@cluster0.kctau19.mongodb.net/StudentDB?retryWrites=true&w=majority",{
    useNewUrlParser:true
});


app.get('/',(req,res)=>{
   res.send("welcome");
})



app.post('/add',async(req,res)=>{
    var data=req.body 
    var student =new studentModel(data)
    await student.save(
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data})
            }
        }
    )
    console.log(data)
   
})

app.post('/viewall',(req,res)=>{
     studentModel.find(
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json(data)
            }
        }
        
    )
})

app.post('/search',(req,res)=>{
    var data = req.body 
    studentModel.find(data,
        (err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json(data)
            }
        }
        
    )
})
app.put("/update",(req,res)=>{

    var admissionNo=req.body.admissionNo;
    var data =req.body
     studentModel.findOneAndUpdate(
        {"admissionNo":admissionNo},data,(err,data)=>{
            if (err) {
               res.json({"Status":"Error","Error":err}) 
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
        )
    
})
app.delete('/delete',(req,res)=>{
    var admissionNo=req.body.admissionNo;
    var data =req.body
     studentModel.findOneAndDelete(
        {"admissionNo":admissionNo},data,(err,data)=>{
            if (err) {
               res.json({"Status":"Error","Error":err}) 
            } else {
                res.json({"Status":"Updated","Data":data})
            }
        }
        )
})
app.listen(3000,()=>{
    console.log("server started")
})

