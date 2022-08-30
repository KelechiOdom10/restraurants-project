import {
  Image,
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  AspectRatio,
  Link,
} from "@chakra-ui/react";
import React from "react";

export default function ContactUsSection() {
  return (
    <Flex
      w="full"
      border="5px solid black"
      borderTop="0px"
      color="gray.800"
      direction={{ base: "column", md: "row" }}
      align="center"
      maxH={{ base: "auto", md: "350px" }}
    >
      <AspectRatio
        width={{ base: "full", md: "50vw", lg: "40vw" }}
        maxH="350px"
        ratio={4 / 3}
        borderRight="5px solid black"
      >
        <Image
          src="/images/hero.jpg"
          alt="Generic Restaurant"
          objectFit="cover"
        />
      </AspectRatio>

      <Flex
        px={{ base: 4, md: 8 }}
        py={{ base: 8, md: 0 }}
        width={{ base: "full", md: "50vw" }}
        align={{ base: "center", md: "flex-start" }}
        direction="column"
        alignSelf="center"
        textAlign={{ base: "center", md: "start" }}
      >
        <Heading fontSize={{ base: "xl", md: "2xl" }} my={4}>
          Lorem ipsum dolor sit amet consectetur
        </Heading>
        <Text
          fontSize={{ base: "sm", md: "md" }}
          w={{ base: "full", md: "80%" }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe maxime
          laborum eveniet quaerat aepe maxime r adipisici
        </Text>
        <Button
          as={Link}
          href="/contact"
          rounded="sm"
          my={6}
          variant="outline"
          bg="white"
          fontWeight="bold"
          colorScheme="teal"
          w={{ base: "full", md: "auto" }}
        >
          Contact Us
        </Button>
      </Flex>
    </Flex>
  );
}
