import { Box, Flex, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useCart } from "../../context/cart";
import CheckoutForm from "./CheckoutForm";
import DrawerItem from "../Cart/DrawerItem";

export default function CheckoutSection() {
  const { cart, cartItems } = useCart();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "start", md: "center" }}
      maxW="6xl"
      w="full"
      mx="auto"
      minH="80vh"
    >
      <VStack align="start" w={{ base: "full", md: "50vw" }} p={4}>
        <Heading fontSize={{ base: "md", md: "lg" }}>Delivery Items</Heading>
        {cartItems === 0 ? (
          <Heading py={4}>Add items to cart to get Started!</Heading>
        ) : (
          <>
            {cart.map(item => (
              <DrawerItem key={item.product} item={item} imageWidth="100px" />
            ))}
          </>
        )}
      </VStack>

      <Box w={{ base: "full", md: "50vw" }} p={3}>
        <CheckoutForm />
      </Box>
    </Flex>
  );
}
