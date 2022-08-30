import {
  Flex,
  AspectRatio,
  Image,
  Heading,
  Text,
  VStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import MenuItemModal from "./MenuItemModal";

export default function MenuItem({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      border="3px solid black"
      _hover={{ transform: "scale(1.03)" }}
      transition="transform .4s ease-in-out"
      cursor="pointer"
      mx={4}
      onClick={onOpen}
      bg="white"
    >
      <Flex justify="space-between" my={2} p={3}>
        <VStack w="50%" align="start" justify="center">
          <Heading fontSize={{ base: "lg", md: "xl" }}>{product.title}</Heading>
          <Text w="90%" isTruncated fontSize={{ base: "sm", md: "md" }}>
            {product.description}
          </Text>
          <Text fontWeight="bold">£{product.price.toFixed(2)}</Text>
        </VStack>
        <AspectRatio ratio={1} minW={{ base: "45%", sm: "45%", md: "50%" }}>
          <Image src={product.image} alt={product.title} rounded="md" />
        </AspectRatio>
      </Flex>
      <MenuItemModal product={product} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
