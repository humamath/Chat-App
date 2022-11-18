import { FormControl, FormLabel, VStack } from '@chakra-ui/react'
import { useState, React } from 'react'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const url = 'http://localhost:5000';


const Signup = () => {

  const [show, setshow] = useState(false);
  const toast = useToast()
  const history = useNavigate()
  const handleClick = ()=> setshow(!show);

  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState();  
  const [pic, setpic] = useState()
  const [loading, setloading] = useState(false)
  

  const submitHandler = async()=>{
    setloading(true);
    if(!name || !email|| !password || !confirmPassword){
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
    if(password !== confirmPassword){
      toast({
        title: 'Paswords Donot match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom",
      });
      setloading(false);
      return;
    }
    console.log(name,email,password,pic);
    try{
      const config = {
       "name":name,
       "email":email,
       "password":password,
       "pic" : pic,
      }
      console.log(config);

      const data = await axios.post("/api/user",config);
      console.log(data);
      toast({
        title: 'Registration Success',
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

  const postDetails = (pics) =>{
    setloading(true);
    if(pics===undefined){
     toast({
       title: 'Select an Image',
       status: 'warning',
       duration: 5000,
       isClosable: true,
       position:"bottom",
     });
     return;
    }
    console.log(pics)
    if(pics.type === "image/jpeg" || pics.type ==="image/png"){
     const data = new FormData();
     data.append("file",pics);
     data.append("upload_preset","Chatter");
     data.append("cloud_name",'dqfk1qfyl');
     fetch("https://api.cloudinary.com/v1_1/dqfk1qfyl/image/upload/",{
        method:"post",
        body:data,
     }).then((res)=>res.json())
     .then(data =>{
       setpic(data.url.toString());
       console.log(data.url.toString());
       setloading(false);
     })
     .catch((err)=>{
       console.log(err);
       setloading(false);
     })
    }
    else{
     toast({
       title: 'Select an Image',
       status: 'warning',
       duration: 5000,
       isClosable: true,
       position:"bottom",
     });
     return;
    }
 }

  return (
    <VStack spacing={'5px'}>
    <FormControl id = 'first-name' isRequired >
      <FormLabel>Name</FormLabel>
      <Input 
      placeholder='Enter Your Name'
      onChange={(e)=>setname(e.target.value)}
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
        accept='image/*'
        onChange={(e)=>postDetails(e.target.files[0])}/>
      </FormControl>
      <Button
      colorScheme={'yellow'}
      width='100%'
      style={{marginTop:'15px'}}
      borderRadius={'20px'}
      onClick = {submitHandler}
      isLoading = {loading}>
       Sign Up
      </Button>

    </VStack>
    );
}

export default Signup
