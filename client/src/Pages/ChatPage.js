import React from 'react';
import axios from 'axios';
import { useEffect , useState } from 'react';
import { ChatState } from '../Context/chatProvider';
import { Box, HStack } from '@chakra-ui/react';
import SideDrawer from '../components/Misscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/chatBox'


const url = 'http://localhost:5000';


const ChatPage = () => {
 
  const { user } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false)

  return (
    <div style={{ width: "100%" }}>
     {user && <SideDrawer/>}
     <Box
      d ="flex"
      justifyContent={'space-between'}
      w="100%" h="91.5vh" p="10px"
     >
     <HStack h='100%'>
      {user && <MyChats/>}
      {user && <ChatBox/>}
      </HStack>
     </Box>


    </div>
  )
}

export default ChatPage
