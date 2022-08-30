import { useAuth } from "../../context/auth";
import {
  Link,
  Button,
  Box,
  Flex,
  HStack,
  VStack,
  useDisclosure,
  VisuallyHidden,
  Icon,
  chakra,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import NextImage from "next/image";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useCart } from "../../context/cart";
import CartDrawer from "../Cart/CartDrawer";

const MenuLink = ({ children, href }) => {
  return (
    <Link
      href={href}
      textDecoration="none"
      fontWeight="semibold"
      whiteSpace="nowrap"
      rounded="md"
      p={2}
      _hover={{
        bg: "gray.200",
      }}
    >
      {children}
    </Link>
  );
};

const CartIcon = () => {
  const { cartItems } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="View Cart"
        mr={{ base: 2, md: 3 }}
        mb={1}
        variant="unstyled"
        onClick={onOpen}
        icon={
          <>
            <Icon
              as={AiOutlineShoppingCart}
              fontSize={{ base: "lg", md: "xl" }}
            />
            {cartItems === 0 ? null : (
              <chakra.span
                pos="absolute"
                top="3px"
                right="5px"
                px={2}
                py={1}
                fontSize="xs"
                fontWeight="semibold"
                lineHeight="none"
                color="white"
                transform="translate(30%,-35%)"
                bg="red.500"
                rounded="full"
              >
                {`${cartItems}`}
              </chakra.span>
            )}
          </>
        }
      />
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default function NavBar() {
  const mobileNav = useDisclosure();
  const { logout, user } = useAuth();

  return (
    <Box
      as="nav"
      border="5px black solid"
      position={{ base: "sticky", md: "sticky" }}
      top="0"
      left="0"
      zIndex={4}
      bg="white"
      w="full"
      p={{ base: 2, sm: 4 }}
      color="black"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Flex>
          <Link
            w={{ base: "25%", sm: "16%", md: "19%", lg: "12%" }}
            href="/"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            <NextImage
              src="/images/restaurant.png"
              alt="restaurant logo"
              width="594px"
              height="423px"
            />
            <VisuallyHidden>Le Restaurant</VisuallyHidden>
          </Link>
        </Flex>
        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            display={{ base: "none", md: "inline-flex" }}
          >
            <MenuLink href="/menu">Menu</MenuLink>
            <MenuLink href="/bookings">Book Table</MenuLink>
            <MenuLink href="/orders">Orders</MenuLink>
            <MenuLink href="/contact">Contact Us</MenuLink>
            {!user && <MenuLink href="/login">Sign In</MenuLink>}
          </HStack>

          <HStack spacing={3} align="center">
            <CartIcon />
            {!!user ? (
              <Button
                colorScheme="red"
                size={useBreakpointValue({ base: "sm", md: "md" })}
                onClick={logout}
              >
                Logout
              </Button>
            ) : (
              <Button
                as="a"
                colorScheme="red"
                size={useBreakpointValue({ base: "sm", md: "md" })}
                href="/signup"
              >
                Sign Up
              </Button>
            )}
          </HStack>
          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              colorScheme="white"
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              borderBottom="5px black solid"
              zIndex={4}
              bg="white"
              w="full"
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              spacing={3}
              shadow="sm"
            >
              <IconButton
                aria-label="Close menu"
                colorScheme="white"
                variant="ghost"
                icon={<AiOutlineClose />}
                onClick={mobileNav.onClose}
              />

              <MenuLink href="/menu">Menu</MenuLink>
              <MenuLink href="/bookings">Book Table</MenuLink>
              <MenuLink href="/orders">Orders</MenuLink>
              <MenuLink href="/contact">Contact Us</MenuLink>
              {!user && <MenuLink href="/login">Sign In</MenuLink>}
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}
