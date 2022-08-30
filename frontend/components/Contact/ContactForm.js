import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ContactForm() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const { firstName, lastName, email, phoneNumber, message } = values;

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log({ firstName, lastName, email, phoneNumber, message });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        flexDirection="column"
        justifyContent="center"
        marginBottom={4}
        bg="white"
      >
        <Heading
          as="h2"
          fontSize={{ base: "4xl", md: "5xl" }}
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          Contact Us
        </Heading>
      </Flex>

      <Stack spacing={6} padding={6} border="5px solid black" bg="white">
        <Stack w="full" direction={{ base: "column", md: "row" }} spacing={4}>
          <FormControl
            id="contact-firstName"
            isRequired
            w={{ base: "full", md: "50%" }}
          >
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              First Name
            </FormLabel>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
          <FormControl
            id="contact-lastName"
            isRequired
            w={{ base: "full", md: "50%" }}
          >
            <FormLabel fontSize={{ base: "sm", md: "md" }}>Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
        </Stack>
        <Stack w="full" direction={{ base: "column", md: "row" }} spacing={4}>
          <FormControl id="contact-email" isRequired>
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
          <FormControl id="contact-number" isRequired>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Phone Number
            </FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone Number"
              value={phoneNumber}
              onChange={handleChange}
              fontSize={{ base: "sm", md: "md" }}
            />
          </FormControl>
        </Stack>
        <FormControl id="contact-message" isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={message}
            name="message"
            onChange={handleChange}
            placeholder="Enter Message"
            size="sm"
          />
        </FormControl>
        <Button type="submit" w="full" colorScheme="red" fontWeight="bold">
          Contact Us
        </Button>
      </Stack>
    </form>
  );
}
