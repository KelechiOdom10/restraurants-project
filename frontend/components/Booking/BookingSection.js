import {
  Box,
  Button,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { axiosInstance } from "../../services/axios";
import BookingFormModal from "./BookingFormModal";
import BookingItem from "./BookingItem";
import { useQueryClient } from "react-query";
import { IoAdd } from "react-icons/io5";

export default function BookingSection({ bookings }) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [myBookings, setMyBookings] = useState(bookings);

  const updateBooking = async (id, payload) => {
    const { data } = await axiosInstance.put(`/api/booking/${id}`, {
      ...payload,
    });

    if (data.success) {
      toast({
        title: "Booking updated.",
        position: "top-right",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      const newBookings = myBookings.map(item => {
        if (item._id === id) {
          const updatedItem = {
            ...data.data,
          };

          return updatedItem;
        }

        return item;
      });

      setMyBookings(newBookings);
      queryClient.invalidateQueries("bookings");
    } else {
      toast({
        title: "An error occurred",
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const createBooking = async payload => {
    const { data } = await axiosInstance.post(`/api/booking`, {
      ...payload,
    });

    if (data.success) {
      toast({
        title: "Booking created.",
        position: "top-right",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setMyBookings([...myBookings, data.data]);
      queryClient.invalidateQueries("bookings");
    } else {
      toast({
        title: "An error occurred",
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box borderX="5px solid black" minH="80vh">
      <Box maxW="4xl" mx={{ base: 4, md: "auto" }} py={8}>
        <Button
          leftIcon={<IoAdd />}
          w="full"
          colorScheme="red"
          fontWeight="bold"
          onClick={onOpen}
        >
          Create a new Booking
        </Button>

        <Heading fontSize={{ base: "2xl", md: "3xl" }} color="gray.600" mt={8}>
          All Bookings
        </Heading>
        {myBookings.length <= 0 && (
          <Heading
            p={10}
            border="5px solid black"
            my={8}
            fontSize={{ base: "xl", md: "2xl" }}
          >
            {" "}
            You currently have no bookings. Create one to get started{" "}
          </Heading>
        )}
        <Box
          my={8}
          border="5px solid black"
          borderBottom="0"
          borderTop={myBookings.length <= 0 && "0"}
        >
          {myBookings.length > 0 &&
            myBookings.map(booking => (
              <BookingItem
                key={booking._id}
                booking={booking}
                updateBooking={updateBooking}
              />
            ))}
        </Box>
      </Box>
      <BookingFormModal
        isOpen={isOpen}
        onClose={onClose}
        createBooking={createBooking}
      />
    </Box>
  );
}
