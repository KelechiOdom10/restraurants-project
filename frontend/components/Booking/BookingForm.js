import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}
if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;

export default function BookingForm({
  booking,
  updateBooking,
  onClose,
  createBooking,
}) {
  const [values, setValues] = useState({
    date: booking ? booking.date : "",
    time: booking ? booking.time : "",
    reservationName: booking ? booking.reservationName : "",
    contactNumber: booking ? booking.contactNumber : "",
  });

  const { date, time, reservationName, contactNumber } = values;

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmitCreate = e => {
    e.preventDefault();
    createBooking({ date, time, reservationName, contactNumber });
    onClose();
  };

  const handleSubmitUpdate = e => {
    e.preventDefault();
    updateBooking(booking._id, { date, time, reservationName, contactNumber });
    onClose();
  };

  return (
    <form onSubmit={booking ? handleSubmitUpdate : handleSubmitCreate}>
      <Flex flexDirection="column" justifyContent="center" marginBottom={4}>
        <Heading
          as="h2"
          fontSize={{ base: "4xl", md: "5xl" }}
          textAlign="center"
          marginTop={2}
          fontWeight="medium"
        >
          {booking ? "Update Booking" : "Create Booking"}
        </Heading>
      </Flex>

      <Stack spacing={6}>
        <FormControl id="appt-date" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Date</FormLabel>
          <Input
            type="date"
            name="date"
            value={date}
            min={today}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="appt-time" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>Time</FormLabel>
          <Input
            type="time"
            name="time"
            value={time}
            onChange={handleChange}
            min="09:00"
            max="18:00"
            isDisabled={new Date(date).getDay() === 0}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="appt-reservation-name" isRequired>
          <FormLabel fontSize={{ base: "sm", md: "md" }}>
            Reservation Name
          </FormLabel>
          <Input
            type="text"
            name="reservationName"
            placeholder="Enter your reservation name"
            value={reservationName}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <FormControl id="appt-contactNumber" isRequired>
          <FormLabel>Contact Number</FormLabel>

          <Input
            type="tel"
            name="contactNumber"
            placeholder="Enter contact Number"
            value={contactNumber}
            onChange={handleChange}
            fontSize={{ base: "sm", md: "md" }}
          />
        </FormControl>
        <Button type="submit" w="full" colorScheme="red" fontWeight="bold">
          {booking ? "Update" : "Create"} Booking
        </Button>
      </Stack>
    </form>
  );
}
