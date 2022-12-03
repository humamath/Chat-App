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

const io  = require("socket.io")(server,{
    cors:{
        origin:"*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
})

io.on("connection",(socket) =>{
    console.log("connected to socket.io");

    socket.on('setup',(userData) =>{
        //console.log(userData);
        socket.join(userData._id);
        socket.emit("connected");
    })

    socket.on("join_chat",(room)=>{
       socket.join(room);
       console.log("user joined " + room);
    }) 


    socket.on('typing',(room)=>{
        socket.in(room).emit("typing")
    })

    socket.on('stop typing',(room)=>{
        socket.in(room).emit("stop typing")
    })

    socket.on("new_msg",(newMessage)=>{
        var chat = newMessage.chat;
        //console.log(chat);
        if(!chat.users){
            return console.log("chat users not defined");
        }
        chat.users.forEach(user => {
            if(user._id == newMessage.sender._id){
                return;
            }
            socket.in(user._id).emit("message Recieved", newMessage);
        });
    })



})