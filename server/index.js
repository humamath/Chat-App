const express = require("express");
const app = express();
const {chats} = require("./data/data.js")
const dotenv = require("dotenv");
const connectDB = require('./config/db') 
const userRoutes = require('./Routes/userRoutes')

dotenv.config();
connectDB();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("API running");
})

app.use('/api/user',userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server is up and running on ${PORT}`));


