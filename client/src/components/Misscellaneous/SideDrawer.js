import React from 'react'
import { useState } from 'react';
import { ChatState } from '../../Context/chatProvider';
import axios from "axios";
import { 
   Box, Button, Tooltip, Text ,
   Menu, MenuButton, MenuList, useDisclosure, 
   MenuItem, MenuDivider, HStack} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { Avatar } from "@chakra-ui/avatar"
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom'
import { Input } from "@chakra-ui/input";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import  ChatLoading  from '../ChatLoading';
import UserListItem from '../userAvatar/userListItem';
import { getSender } from '../../config/ChatLogics';
import NotificationBadge from 'react-notification-badge'




const SideDrawer = () => {

  const history = useNavigate();
  const toast = useToast();


  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { 
    setselectedchat,
    user,
    notification,
    setNotification,
    chats,
    setchats,} = ChatState();

  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () =>{
    localStorage.removeItem("userInfo");
    history("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userID) => {
    //console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          //"Content-type": "application/json",
          Authorization: `Bearer ${user.data.token}`,
        },
      };
      const body = {
        "userId" : `${userID}`
      }
      const { data } = await axios.post('/api/chat', body , config);

      if (!chats.find((c) => c._id === data._id)) setchats([data, ...chats]);
     
      setselectedchat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };





  return (
    <>
    <HStack spacing='25px'>
    <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="30%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
        overflow={'hidden'}
    >
    <Tooltip label ="Search Users to chat" hasArrow placement="bottom-end">
      <Button variant={"ghost"} onClick = {onOpen}>
        <i class="fas fa-search"></i>
          <Text  d={{ base: "none", md: "flex" }} px={4}>
          Search User
          </Text>
      </Button>
    </Tooltip>
    </Box>
    <Box d = 'flex'
    p ={3}
    w = '50%'
    m = "40px 0 50px 0"
    bg={'linear-gradient(to right, #fdc830, #f37335)'}
    borderRadius= '50px'
    borderWidth='1px'
    textAlign={'center'}>
      <Text 
      as={'b'}
      fontSize={'3xl'}
      fontFamily="work sans"
      color={"black"}>
        ChatterBox
    </Text>
    </Box>
    <Box width= "30%"
    paddingLeft={'20%'}>
    <div>
      <Menu>
        <MenuButton p={1}>
          <BellIcon fontSize="2xl" m={1}/>
        </MenuButton>
        <NotificationBadge
        
        />
        <MenuList pl={2}>{!notification.length && "No new msg"}
          {notification.map((notif)=>(
           <MenuItem key = {notif._id} onClick={()=>{
            setselectedchat(notif.chat);
            setNotification(notification.filter((n)=>n !== notif))
           }}>
           {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}`
          :`New Message from ${getSender(user,notif.chat.users)}`}
           </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
         <Avatar 
         size='sm'
          cursor='pointer'
          name={user.data.name}
          src={user.data.pic}/>
         </MenuButton>
         <MenuList>
         <ProfileModal user={user}>
          <MenuItem> My Profile</MenuItem>{"  "}
          </ProfileModal>
          <MenuDivider/>
          <MenuItem onClick={logoutHandler}>Logout</MenuItem>
         </MenuList>
      </Menu>
    </div>
    </Box>
    </HStack>
    
    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
      <DrawerBody>
        <Box d="flex" pb={2}>
          <Input
            placeholder="Search by name or email"
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch}>Go</Button>
        </Box>
          {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((user) => (
            <UserListItem
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
            />
          ))
        )}
          {loadingChat && <Spinner ml="auto" d="flex" />}
       </DrawerBody>
    </DrawerContent>
    </Drawer>

    </>

  );
}

export default SideDrawer;
