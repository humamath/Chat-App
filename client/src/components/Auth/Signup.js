import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { useState, React } from 'react'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";


const Signup = () => {

  const [show, setshow] = useState(false);
  const [Name, setName] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();  
  const [pic, setpic] = useState()

  const handleClick = ()=> setshow(!show);

  const postDetails = (pics) =>{

  }

  const submitHandler = ()=>{

  }

  return (
    <VStack spacing={'5px'}>
    <FormControl id = 'first-name' isRequired >
      <FormLabel>Name</FormLabel>
      <Input 
      placeholder='Enter Your Name'
      onChange={(e)=>setName(e.target.value)}
      size = 'md'
      />
    </FormControl>
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
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            border={'black'}
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id ='pic'>
      <FormLabel>Upload Profile Picture</FormLabel>
        <Input
        type = 'file'
        p='1.5'
        accept='image/'
        onChange={(e)=>postDetails(e.target.files[0])}/>
      </FormControl>
      <Button
      colorScheme={'yellow'}
      width='100%'
      style={{marginTop:'15px'}}
      borderRadius={'20px'}
      onClick = {submitHandler}> Sign Up
      </Button>

    </VStack>
    );
}

export default Signup
