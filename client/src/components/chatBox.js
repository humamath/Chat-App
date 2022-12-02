import { Box } from "@chakra-ui/layout";
import "./styles.css";
import React from "react";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/chatProvider";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedchat } = ChatState();

  return (
    <Box
      d={{ base: selectedchat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      h={'100%'}
      borderRadius="lg"
      borderWidth="1px"
    >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;