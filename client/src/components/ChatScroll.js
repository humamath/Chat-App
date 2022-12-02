import React from 'react'
import {
  isSameSender ,
  isLastMessage,
  isSameSenderMargin,
  isSameUser}
   from '../config/ChatLogics'
import ScrollableFeed from 'react-scrollable-feed'
import {ChatState} from '../Context/chatProvider'
import { Tooltip } from '@chakra-ui/react'
import { Avatar } from "@chakra-ui/avatar";
import { Text } from '@chakra-ui/react';


const ChatScroll = ({messages}) => {

  const { user } = ChatState();
  //console.log(user);

  return (
    <div>
      {messages && messages.map((m,i) => (
        <div style={{ display: "flex" }} key={m._id}>

          {
            (isSameSender(messages,m,i,user.data._id)
            || isLastMessage(messages,i,user.data._id)
            )&&(
           
              <Tooltip placement="bottom-start" label={m.sender.name}
               hasArrow>
              <Avatar
              mt="7px"
              mr={1}
              size="sm"
              cursor="pointer"
              name={m.sender.name}
              src={m.sender.pic}
              >
              </Avatar>
            </Tooltip>
          
            )
          }
          <div
              style={{
                backgroundColor: `${
                  m.sender._id === user.data._id ? "#f8b500" : "#a8e063"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.data._id),
                marginTop: isSameUser(messages, m, i, user.data._id) ? 3 : 10,
                borderRadius: "15px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
             {m.content}
        </div>
        </div>
        
  ))}
      </div>
  )
}

export default ChatScroll;
