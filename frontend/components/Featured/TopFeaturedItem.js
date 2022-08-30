import {
  Flex,
  VStack,
  useBreakpointValue,
  Button,
  Heading,
  Text,
  Box,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "../../context/cart";

export default function TopFeaturedItem({ item }) {
  const { addToCart } = useCart();
  return (
    <Flex
      flexDirection="column"
      rounded="md"
      border="5px solid black"
      minW={{ base: "220px", md: "280px" }}
      bg="white"
      boxShadow="md"
      mx={2}
      my={4}
    >
      <Flex
        height={{ base: "120px", md: "160px" }}
        backgroundImage={`url(${item.image})`}
        backgroundSize="cover"
        backgroundPosition="center"
        borderBottom="5px solid black"
      ></Flex>
      <VStack
        width="100%"
        align="start"
        spacing={4}
        py={4}
        px={4}
        textAlign="left"
      >
        <Heading
          fontWeight="extrabold"
          h="20px"
          fontSize={{ base: "sm", md: "md" }}
        >
          {item.title}
        </Heading>
        <Text
          w="90%"
          isTruncated
          fontSize={{ base: "sm", md: "md" }}
          color="gray.500"
        >
          {item.description}
        </Text>
        <Heading as="h4" fontSize={{ base: "md", md: "lg" }} color="gray.500">
          £ {item.price.toFixed(2)}
        </Heading>

        <Flex justifyContent="space-between" align="center" w="100%">
          <Button
            leftIcon={<AiOutlineShoppingCart />}
            size={useBreakpointValue({ base: "sm", sm: "md" })}
            colorScheme="red"
            width="full"
            onClick={() => {
              addToCart(item);
            }}
          >
            Add to Cart
          </Button>
        </Flex>
      </VStack>
    </Flex>
  );
}
