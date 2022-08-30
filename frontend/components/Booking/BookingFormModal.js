import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import BookingForm from "./BookingForm";

export default function BookingFormModal({
  booking,
  onClose,
  isOpen,
  updateBooking,
  createBooking,
}) {
  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={useBreakpointValue({
          base: "lg",
          md: "xl",
        })}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {booking ? `${booking.reservationName}` : "Create new Booking"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box p={4}>
              {booking ? (
                <BookingForm
                  booking={booking}
                  onClose={onClose}
                  updateBooking={updateBooking}
                />
              ) : (
                <BookingForm createBooking={createBooking} onClose={onClose} />
              )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              w="full"
              onClick={onClose}
              variant="outline"
              colorScheme="red"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
