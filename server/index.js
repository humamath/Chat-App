const express = require("express");
const app = express();
const {chats} = require("./data/data.js")
const dotenv = require("dotenv");
const connectDB = require('./config/db') 
const userRoutes = require('./Routes/userRoutes')
const chatRoutes = require('./Routes/chatRoutes')
const messsageRoutes = require('./Routes/messageRoutes')
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json()); //to accept JSON

app.get('/',(req,res)=>{
    res.send("API running");
})

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messsageRoutes);
app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log(`server is up and running on ${PORT}`));

const io  = require(socket.io)(server,{
    cors:{
        origin:"http://localhost:3000/"
    }
})
