import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Image,
  Link,
} from "@chakra-ui/react";
import React from "react";

export default function Hero() {
  return (
    <Box
      position="relative"
      px={{ base: 6, md: 16, lg: 24 }}
      border="5px black solid"
      borderTop="0px"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        mx="auto"
        height={{ base: "320px", md: "400px" }}
        justifyContent="space-around"
        maxW="6xl"
        alignItems="center"
        justifyContent="center"
      >
        <Box p={4} textAlign={{ base: "center", md: "left" }}>
          <Heading
            my={2}
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            w={{ base: "full", md: "90%" }}
          >
            Best Cuisines you can find in Inner London
          </Heading>
          <Text my={4} fontSize={{ base: "md", md: "xl" }} fontWeight="bold">
            Hungry? We deliver all across London!
          </Text>
          <Button
            as={Link}
            my={4}
            w={{ base: "full", md: "auto" }}
            colorScheme="red"
            href="/menu"
            _hover={{ textDecoration: "none" }}
          >
            Order from us
          </Button>
        </Box>

        <Image
          src="/images/9m.jpg"
          rounded="md"
          boxShadow="xl"
          border="5px black solid"
          display={{ base: "none", md: "block" }}
          width={{ base: "full", md: "60%", lg: "70%" }}
          maxH="350px"
          alt="Generic restaurant"
        />
      </Flex>
    </Box>
  );
}
