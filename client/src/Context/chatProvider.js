import { createContext , useContext } from "react";

const ChatContext = createContext();

const ChatProvider = ({children}) => {
    return <ChatContext.Provider>{children}</ChatContext.Provider>;
}

const first = useContext(second)

export default ChatProvider;