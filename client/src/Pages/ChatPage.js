import React from 'react';
import axios from 'axios';
import { useEffect , useState } from 'react';

const url = 'http://localhost:5000';


const ChatPage = () => {

  const [chats, setchats] = useState([]);
  const fetchchats = async () =>{
        const { data } =await axios.get(`${url}/api/chats`);
        setchats(data);
  };
  useEffect(() => {
     fetchchats();
  }, [])
  


  return (
    <div>
      {chats.map((chat)=><div>{chat.chatName}</div>)}
    </div>
  )
}

export default ChatPage
