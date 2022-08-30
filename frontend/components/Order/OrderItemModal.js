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
  Text,
  Heading,
  VStack,
  Badge,
  HStack,
  Image,
} from "@chakra-ui/react";

export default function OrderItem({ order, onClose, isOpen, color }) {
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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>#{order._id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="full">
            <VStack align="start" spacing={6}>
              <Heading fontSize={{ base: "lg", md: "xl" }}>
                £{order.total.toFixed(2)}
              </Heading>
              <Text w="full">{order.user.email}</Text>
              <Text w="full">{order.address}</Text>
              <Text w="full">{order.phoneNumber}</Text>
              <Badge
                variant="subtle"
                colorScheme={color[`${order.status}`]}
                fontSize={{ base: "sm", md: "md" }}
              >
                {order.status}
              </Badge>

              {order.products.map(product => (
                <HStack
                  borderWidth={3}
                  borderColor="black"
                  key={product.product}
                  p={4}
                  justify="space-between"
                  w="full"
                >
                  {product.image && (
                    <Image src={product.image} w="100px" alt={product.name} />
                  )}
                  <VStack align="start" w="full">
                    <Text w="full">{product.name}</Text>
                    <Text w="full">{product.price.toFixed(2)}</Text>
                  </VStack>
                  <VStack align="flex-end">
                    <Text w="full" fontWeight="bold">
                      X{product.quantity}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              w="full"
              onClick={onClose}
              variant="outline"
              colorScheme="teal"
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
