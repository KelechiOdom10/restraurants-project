import { VStack, Icon, Heading, Text } from "@chakra-ui/react";

function Service({ icon, title, description }) {
  return (
    <VStack
      textAlign="center"
      alignItems="center"
      justify="space-evenly"
      rounded="md"
      p={4}
      maxWidth={{ base: "260px", md: "320px" }}
      minHeight={{ base: "300px", md: "350px" }}
      bg="white"
      boxShadow="xl"
      border="5px solid black"
      my={4}
      spacing={4}
    >
      <Icon
        as={icon}
        fontSize={{ base: "2xl", md: "3xl" }}
        w={{ base: 12, md: 16 }}
        h={{ base: 12, md: 16 }}
        p={{ base: 2, md: 3 }}
        color="red.500"
        bg="red.50"
        rounded="full"
      />
      <Heading
        color="gray.800"
        fontWeight="bold"
        fontSize={{ base: "xl", md: "2xl" }}
      >
        {title}
      </Heading>
      <Text
        color="gray.800"
        fontWeight="medium"
        align="center"
        fontSize={{ base: "md", md: "lg" }}
      >
        {description}
      </Text>
    </VStack>
  );
}

export default Service;
