import {
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Flex,
  InputRightElement,
  Text,
  Link,
  Stack,
  IconButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import React, { useState } from "react";
import { useAuth } from "../../context/auth";

export default function LoginForm() {
  const { login } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const [show, setShow] = useState(false);

  const toggle = e => {
    e.preventDefault();
    setShow(!show);
  };

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="column" justifyContent="center" marginBottom={4}>
        <Heading
          as="h2"
          fontSize={{ base: "4xl", md: "5xl" }}
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          Welcome Back!
        </Heading>
      </Flex>

      <Stack spacing={6}>
        <FormControl id="email" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>
            Email address
          </FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
              fontSize={{ base: "sm", md: "md" }}
            />
            <InputRightElement width="3rem">
              <IconButton
                h="1.75rem"
                onClick={toggle}
                colorScheme="gray"
                icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" w="full" colorScheme="red" fontWeight="bold">
          Sign In
        </Button>
      </Stack>

      <Box>
        <Text fontSize={{ base: "sm", md: "md" }}>
          Don't have an account?{" "}
          <Link color="red.500" fontWeight="bold" href="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>
    </form>
  );
}
