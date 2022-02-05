const express = require('express');
const path=require('path');
const app=express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/feedback');
const port=process.env.PORT || 8000;
const bodyparser=require("body-parser");
const feedbk= new mongoose.Schema({
    name: String,
    feed: String
  });
const home = mongoose.model('home', feedbk);
app.use('/static',express.static('static'))
app.use(express.urlencoded())
app.set('view engine', 'pug')

app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    res.status(200).render('home.pug')
})
app.get('/home',(req,res)=>{
    res.status(200).render('home.pug')
})
app.post('/home',(req,res)=>{
    var myData= new home(req.body);
    myData.save().then(()=>{
        res.send("THANKS  FOR  YOUR  FEEDBACK")
    }).catch(()=>{
        res.status(400).send("YOUR  FEEDBACK  CAN'T  SUBMIT")
    })
})

app.get('/images',(req,res)=>{
    res.status(200).render('images.pug')
})
app.get('/education',(req,res)=>{
    res.status(200).render('education.pug')
})
app.get('/music',(req,res)=>{
    res.status(200).render('music.pug')
})
app.get('/about',(req,res)=>{
    res.status(200).render('about.pug')
})


app.listen(port,()=>{
    console.log(`The application is started succesfully on port ${port}`);
});