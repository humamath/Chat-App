import { createContext , useContext, 
    useEffect,
    useState
 } from "react";
import { useNavigate } from 'react-router-dom'

const ChatContext = createContext();

const ChatProvider = ({children}) => {

    const history = useNavigate();

    const [user, setuser] = useState();
    const [selectedchat, setselectedchat] = useState()
    const [notification, setNotification] = useState([]);
    const [chats, setchats] = useState([])

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setuser(userInfo);

      if(!userInfo){
        history("/");
      }

    }, [history])
    

    return <ChatContext.Provider 
    value={{
      selectedchat,
      setselectedchat,
      user,
      setuser,
      notification,
      setNotification,
      chats,
      setchats,
    }}>
    {children}
    </ChatContext.Provider>;
}

export const ChatState = () => {
    return useContext(ChatContext);
};
  
export default ChatProvider;
