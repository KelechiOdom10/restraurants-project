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
import { FiEdit } from "react-icons/fi";
import BookingFormModal from "./BookingFormModal";

export default function BookingItem({ booking, updateBooking }) {
  const currentDate = new Date();
  const bookingDate = new Date(`${booking.date} ${booking.time}`);
  const pastBooking = currentDate - bookingDate > 0;
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <HStack
      w="full"
      justify="space-between"
      p={4}
      borderBottom="5px solid black"
      bg={pastBooking ? "gray.100" : "white"}
    >
      <VStack spacing={4} align="start">
        <Heading fontSize={{ base: "xl", md: "2xl" }}>
          {booking.reservationName}
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.600"
        >
          {booking.date}
        </Text>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="gray.600"
        >
          {booking.time}
        </Text>
      </VStack>

      <VStack align="flex-end">
        <IconButton
          aria-label="Edit Booking"
          colorScheme="teal"
          icon={<FiEdit />}
          isDisabled={pastBooking}
          onClick={onOpen}
        />
        {pastBooking && (
          <Badge
            variant="subtle"
            colorScheme="red"
            fontSize={{ base: "sm", md: "md" }}
          >
            Date has passed
          </Badge>
        )}
      </VStack>
      <BookingFormModal
        isOpen={isOpen}
        onClose={onClose}
        booking={booking}
        updateBooking={updateBooking}
      />
    </HStack>
  );
}
