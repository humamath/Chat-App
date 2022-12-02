import { React,useEffect} from 'react';
import {
   Container,
   Box,
   Text,
   Tabs,
   TabList,
   TabPanels,
   Tab,
   TabPanel } from '@chakra-ui/react'
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { useNavigate } from 'react-router-dom'



const HomePage = () => {

  const history = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user){
      history("/chats");
    }

  }, [history])

  return (
    <Container maxW='xl' centerContent>
    <Box
    d = 'flex'
    p ={3}
    w = '100%'
    m = "40px 0 15px 0"
    bg={'linear-gradient(to left, #fdc830, #f37335)'}
    borderRadius= '50px'
    borderWidth='1px'>
    <Text
    as={'b'}
    fontSize={'4xl'}
    fontFamily="work sans"
    color={"black"}
    paddingLeft = {'160px'}
    >ChatterBox</Text>
    </Box>
    <Box
      w = '100%'
      bg = {'#FBFAF9'}
      borderRadius= '8%'
      p = {4}
      borderWidth={'1px'}
    >
    <Tabs isFitted variant='soft-rounded' colorScheme='green'>
    <TabList mb='1em'>
    <Tab width={'50%'} textColor="black">Login</Tab>
    <Tab width={'50%'} textColor="black">Signup</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
      <Login/>
      </TabPanel>
      <TabPanel>
      <Signup/>
      </TabPanel>
    </TabPanels>
    </Tabs>
    
    </Box>
    
    </Container>
  );
}

export default HomePage;
