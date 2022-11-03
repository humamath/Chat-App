import React from 'react'
import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";

const Login = () => {

  const [show, setshow] = useState(false);
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const handleClick = ()=> setshow(!show);



  const submitHandler = ()=>{

  }

  return (
    <VStack spacing={'5px'}>

    <FormControl id = 'email' isRequired >
      <FormLabel>Email</FormLabel>
      <Input 
      placeholder='Enter Email'
      size = 'md'
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
      onClick = {submitHandler}> Login
      </Button>
      <Button
      variant={'solid'}
      colorScheme = 'orange'
      borderRadius={'20px'}
      style={{marginTop:'15px',color:'black'}}
      width={'100%'}
      onClick={()=>{
        setemail('guest@chatterbox.com');
        setpassword('chatterbox');
      }}> Guest user Login
      </Button>

    </VStack>
  );
}

export default Login
