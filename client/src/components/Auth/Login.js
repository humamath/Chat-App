import React from 'react'
import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';


const Login = () => {

  const [show, setshow] = useState(false);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loading, setloading] = useState(false);

  const handleClick = ()=> setshow(!show);
  const toast = useToast()
  const history = useNavigate()


  const submitHandler = async()=>{
    setloading(true);
    if(!email|| !password ){
      toast({
        title: 'Fill all Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });
      setloading(false);
      return;
    }
    
    console.log(email,password);
    try{
      const config = {
       "email":email,
       "password":password,
      }
      console.log(config);

      const data = await axios.post("/api/user/login",config );
      console.log(data);
      toast({
        title: 'Login Success',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });

      localStorage.setItem('userInfo',JSON.stringify(data));
      setloading(false);
      history('/chats');
    }catch(error){
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setloading(false);
    }
  }

  return (
    <VStack spacing={'5px'}>

    <FormControl id = 'email' isRequired >
      <FormLabel>Email</FormLabel>
      <Input 
      placeholder='Enter Email'
      size = 'md'
      value ={email}
      onChange={(e)=>setemail(e.target.value)}
      />
    </FormControl>
    <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            border={'black'}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            value ={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
      colorScheme={'yellow'}
      width='100%'
      style={{marginTop:'15px'}}
      borderRadius={'20px'}
      onClick = {submitHandler}
      isLoading={loading}> Login
      </Button>
      <Button
      variant={'solid'}
      colorScheme = 'orange'
      borderRadius={'20px'}
      style={{marginTop:'15px',color:'black'}}
      width={'100%'}
      onClick={()=>{
        setemail('guest@chatterbox.com');
        setpassword('abc');
      }}
      > Guest user Login
      </Button>

    </VStack>
  );
}

export default Login
