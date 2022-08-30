import {
  Badge,
  Heading,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import OrderItemModal from "./OrderItemModal";

export default function OrderItem({ order }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const color = {
    "Paid & Preparing": "orange",
    "On it's way!": "yellow",
    Delivered: "green",
    Cancelled: "red",
  };

  return (
    <HStack
      w="full"
      justify="space-between"
      p={4}
      borderBottom="5px solid black"
      bg="white"
      cursor="pointer"
      onClick={onOpen}
      wrap="wrap"
    >
      <VStack spacing={4} align="start">
        <Heading fontSize={{ base: "lg", md: "xl" }} whiteSpace="normal">
          Order #{order._id}
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.600"
        >
          £{order.total.toFixed(2)}
        </Text>
      </VStack>

      <VStack align="flex-end">
        <Badge
          variant="subtle"
          colorScheme={color[`${order.status}`]}
          fontSize={{ base: "sm", md: "md" }}
          mt={{ base: 4, md: 0 }}
          ml={{ base: "-8px", md: 0 }}
        >
          {order.status}
        </Badge>
      </VStack>
      <OrderItemModal
        color={color}
        isOpen={isOpen}
        onClose={onClose}
        order={order}
      />
    </HStack>
  );
}
