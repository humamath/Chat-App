import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { ChatState } from '../Context/chatProvider'
import { Box, FormControl, Input, SimpleGrid, Spinner, Text, useToast} from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons';
import {getSender , getSenderDetails} from '.././config/ChatLogics'
import ProfileModal from './Misscellaneous/ProfileModal'
import { UpdateGroupChatModal } from './Misscellaneous/UpdateGroupChatModal.js'
import { set } from 'mongoose';
import './styles.css'
import  ChatScroll from '../components/ChatScroll'


const SingleChat = ({fetchAgain,setFetchAgain}) => {
  
  const { user, selectedchat, setselectedchat } = ChatState();
  const [messages, setmessages] = useState([]);
  const [loading, setloading] = useState(false);
  const [newMessage,setnewMessage] = useState("");
  const toast = useToast();

  const sendMessage = async (event) =>{
    if(event.key == 'Enter' && newMessage){
      try{
        const body = {
          chatId : selectedchat._id,
          content : newMessage,
        }
        setnewMessage("");
        const { data } = await axios({
           method: 'post',
           url: `/api/message`,
           params : body,
           headers : {'Authorization': 'Bearer '+ user.data.token}
        });
        console.log(data);
        setmessages([...messages,data]);
      }catch(error){
        toast({
          title: "Error Occured!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  }

  const fetchMessages = async() =>{
    if(!selectedchat) return;
    try{
      
      setloading(true);
      const { data } = await axios({
         method: 'get',
         url: `/api/message/${selectedchat._id}`,
         headers : {'Authorization': 'Bearer '+ user.data.token}
      });
      setmessages(data);
      setloading(false);
      console.log(data);
    }catch(error){
      toast({
        title: "Error Occured!",
        description: "Failed to send the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
  
  useEffect(() => {
    fetchMessages();
  }, [selectedchat])
  

  const typingHandler = (e)=>{
    setnewMessage(e.target.value);
  }

    return (
    <>
      {selectedchat ? (
        <>
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none"}}
              marginRight = '10px'
              icon={<ArrowBackIcon />}
              onClick={() => setselectedchat("")}
            />
           {!selectedchat.isGroupChat ? (
                <>
                {/*getSender(user,selectedchat.users)*/}
                {/*<ProfileModal user = {getSenderDetails(user,selectedchat.users)}/>*/}
                </>
           ):(
            <>

            
            {selectedchat.chatName.toUpperCase()}
           
            </>
           )}
          </Text> 
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="92.5%"
            borderRadius="lg"
            overflowY="hidden"
          >
          <Box
          height={'500px'}
          overflowY={"scroll"}>
          {loading ? (
            <Spinner
            alignContent={'center'}
            thickness='4px'
            margin={'25% 25% 50% 50%'}
            speed='0.65s'
            emptyColor='gray.200'
            color='green.500'
            size='xl'
            />
          ):(
            <div className='messages'>
            {/*Messages*/}
            
           {/* <ChatScroll messages = {messages}/>*/}
            </div>
          )}
          </Box>
          <Box>
          <FormControl onKeyDown={ sendMessage } isRequired mt={3}>
          <Input 
           variant="filled"
           bg="white"
           placeholder="Enter a message.."
           value={newMessage}
           position = 'bottom'
           onChange={typingHandler}
          />
          </FormControl>
          </Box>
          </Box>
        </> 
        ):(
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
            <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Add User & Start chatting
            </Text>
        </Box>
      )}
    </>
  )
}


export default SingleChat
