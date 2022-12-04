import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender,getSenderPic } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./Misscellaneous/GroupChatModal";
import { Avatar, Button } from "@chakra-ui/react";
import { ChatState } from "../Context/chatProvider";
import { Wrap, WrapItem } from "@chakra-ui/layout";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedchat, setselectedchat, user, chats, setchats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
     console.log(user.data._id);
     console.log(user.data.token);
    try {
      
      const body = {
        "userId" : `${user.data._id}`
      }
      const { data } = await axios({
         method: 'get',
         url: `/api/chat`,
         params : body,
         headers : {'Authorization': 'Bearer '+ user.data.token}
      });

      console.log(data);
      setchats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedchat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      height = "100%"
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px"}}
        fontFamily="Work sans"
        fontWeight={'bold'}
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        CHATS   
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
            marginLeft = "20%"
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="91%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setselectedchat(chat)}
                cursor="pointer"
                bg={selectedchat === chat ? "#4da0b0" : "#E8E8E8"}
                color={selectedchat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
              <Wrap>
              <WrapItem>
              <Avatar
              mt="7px"
              mr={1}
              size="md"
              cursor="pointer"
              src = {!chat.isGroupChat
                ? getSenderPic(loggedUser, chat.users)
                : "https://cdn2.iconfinder.com/data/icons/outline-basic-ui-set/139/Profile_GroupFriend-Outline-512.png"}
              >
              </Avatar>
              </WrapItem>
              <WrapItem>
                <Text
                paddingTop={'15px'}
                fontSize='lg'>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                </WrapItem>
                {/*{chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                    )}*/}
                </Wrap>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;