const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModal");
const User = require('../models/userModal');
const Message = require("../models/messageModal")

const sendMessage = expressAsyncHandler(async(req,res) =>{
   // console.log(req.query);
   const { content,chatId } = req.query;
   //console.log(content,chatId);
   if(!content || !chatId){
    console.log("Invalid data passed into Request");
    return res.sendStatus(400);
   }
   var newmsg = {
    sender : req.user._id,
    content : content,
    chat: chatId,
   };

   try{
    var message  = await Message.create(newmsg);
    message = await message.populate("sender","name pic");
    message = await message.populate("chat");
    message = await User.populate(message,{
        path : 'chat.users',
        select: "name pic email"
    })
   
    await Chat.findByIdAndUpdate(req.body.chatId,{
        latestMessage: message,
    })

    res.json(message);

   }catch(error){
    res.status(400);
    throw new Error(error.message);

   }

});

const  allMessages = expressAsyncHandler(async(req,res)=>{
   try{

    const messages = await Message.find({ chat: req.params.chatId }).populate(
        "sender",
        "name pic email"
        ).populate('chat');
        res.json(messages);
    }catch(error){
        res.status(400);
        throw new Error(error.message);    
   }
})

module.exports = { sendMessage,allMessages };