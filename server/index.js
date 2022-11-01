const express = require("express");
const app = express();
const {chats} = require("./data/data.js")
const dotenv = require("dotenv");
dotenv.config();

app.get('/',(req,res)=>{
    res.send("API running");
})

app.get('/api/chats',(req,res)=>{
    res.send(chats);
})

app.get('/api/chats/:id',(req,res)=>{
    // console.log(req.params.id);
    const singlechat = chats.find(c=>c._id === req.params.id);
    res.send(singlechat);
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server is up and running on ${PORT}`));


