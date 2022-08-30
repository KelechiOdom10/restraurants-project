import {
  Image,
  Input,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  Heading,
  useBreakpointValue,
  HStack,
  Box,
  Link,
} from "@chakra-ui/react";
import { useCart } from "../../context/cart";
import DrawerItem from "./DrawerItem";
import NextImage from "next/image";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cart, total } = useCart();

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={useBreakpointValue({ base: "sm", md: "md" })}
    >
      <DrawerOverlay />
      <DrawerContent border="5px solid black" borderX="0" bg="white">
        <Box border="5px solid black" borderY="0">
          <DrawerCloseButton />
          <DrawerHeader>
            <NextImage
              src="/images/restaurant.png"
              alt="restaurant logo"
              width="62"
              height="43"
            />
          </DrawerHeader>
        </Box>
        <Divider />

        {cartItems === 0 ? (
          <Heading p={4}>Add items to cart to get Started!</Heading>
        ) : (
          <>
            <DrawerBody border="5px solid black" bg="white">
              {cart.map(item => (
                <DrawerItem key={item.product} item={item} />
              ))}
            </DrawerBody>
            <DrawerFooter border="5px solid black" borderTop="0">
              <Box w="full">
                <HStack justify="space-between" mx={2} my={4}>
                  <Heading fontSize={{ base: "xl", md: "2xl" }}>
                    SUBTOTAL:
                  </Heading>{" "}
                  <Heading as="h5" fontSize={{ base: "lg", md: "xl" }}>
                    £{total.toFixed(2)}
                  </Heading>
                </HStack>
                <Button
                  as={Link}
                  bg="gray.800"
                  color="gray.10"
                  _hover={{
                    textDecoration: "none",
                    bg: "gray.800",
                    color: "gray.10",
                  }}
                  w="full"
                  href="/checkout"
                >
                  Checkout
                </Button>
              </Box>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
