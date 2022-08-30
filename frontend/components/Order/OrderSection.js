import { Box, Heading, Link } from "@chakra-ui/react";
import React from "react";
import OrderItem from "./OrderItem";

export default function OrderSection({ orders }) {
  return (
    <Box borderX="5px solid black" minH="80vh">
      <Box maxW="4xl" mx={{ base: 4, md: "auto" }} py={8}>
        <Heading fontSize={{ base: "2xl", md: "3xl" }} color="gray.600">
          All Orders
        </Heading>
        {orders.length <= 0 && (
          <Heading
            p={10}
            border="5px solid black"
            my={8}
            fontSize={{ base: "xl", md: "2xl" }}
          >
            {" "}
            You currently have no Orders. Go to the{" "}
            <Link href="/menu">menu</Link> to start ordering!
          </Heading>
        )}
        <Box
          my={8}
          border="5px solid black"
          borderBottom="0"
          borderTop={orders.length <= 0 && "0"}
        >
          {orders.length > 0 &&
            orders.map(order => <OrderItem key={order._id} order={order} />)}
        </Box>
      </Box>
    </Box>
  );
}
