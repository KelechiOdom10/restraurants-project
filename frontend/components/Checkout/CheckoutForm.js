import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Stack,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCart } from "../../context/cart";
import { axiosInstance } from "../../services/axios";

export default function CheckoutForm() {
  const [values, setValues] = useState({
    address: "",
    phoneNumber: "",
  });
  const { address, phoneNumber } = values;
  const { cart, total, cartItems, clearCart } = useCart();
  const toast = useToast();
  const router = useRouter();

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createOrder = async payload => {
    const { data } = await axiosInstance.post("api/order", { ...payload });

    if (data.success) {
      toast({
        title: "Order created",
        position: "top-right",
        description: data.message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      setValues({
        address: "",
        phoneNumber: "",
      });
      clearCart();
      router.push("/orders");
    } else {
      toast({
        title: "An error occurred",
        position: "top-right",
        description: "Order not created",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createOrder({ address, phoneNumber, total, products: cart });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex flexDirection="column" justifyContent="center" marginBottom={4}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          marginTop={2}
          fontWeight="medium"
        >
          Enter Delivery and Contact Details
        </Heading>
      </Flex>

      <Stack spacing={6} padding={6} border="5px solid black" bg="white">
        <FormControl id="delivery-address" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>
            Delivery Address
          </FormLabel>
          <Input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={address}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="delivery-number" isRequired>
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
        <Button
          type="submit"
          w="full"
          colorScheme="red"
          fontWeight="bold"
          isDisabled={cartItems === 0}
        >
          Checkout
        </Button>
      </Stack>
    </form>
  );
}
