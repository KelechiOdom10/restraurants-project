import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Image,
  Button,
  Stack,
  useBreakpointValue,
  AspectRatio,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useCart } from "../../context/cart";

export default function MenuItemModal({ product, onClose, isOpen }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
          <ModalHeader>{product.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AspectRatio ratio={16 / 9} w="100%">
              <Image src={product.image} alt={product.title} />
            </AspectRatio>

            <Heading fontSize={{ base: "lg", md: "xl" }} my={8}>
              £{product.price.toFixed(2)}
            </Heading>
            <Text my={8} w="full">
              {product.description}
            </Text>

            <NumberInput
              defaultValue={quantity}
              min={1}
              max={product.inStock}
              w="full"
              mx="auto"
              keepWithinRange={true}
            >
              <NumberInputField onChange={e => setQuantity(e.target.value)} />
              <NumberInputStepper>
                <NumberIncrementStepper
                  onClick={() => setQuantity(q => q + 1)}
                />
                <NumberDecrementStepper
                  onClick={() =>
                    setQuantity(q => {
                      if (q <= 1) {
                        q = 1;
                      } else {
                        q - 1;
                      }
                    })
                  }
                />
              </NumberInputStepper>
            </NumberInput>
          </ModalBody>
          <ModalFooter>
            <Stack
              w="full"
              direction={{ base: "column", md: "row" }}
              spacing={4}
            >
              <Button
                w={{ base: "full", md: "35%" }}
                onClick={onClose}
                variant="outline"
                colorScheme="teal"
              >
                Close
              </Button>
              <Button
                w={{ base: "full", md: "65%" }}
                colorScheme="teal"
                onClick={() => {
                  addToCart(product, Number(quantity));
                  onClose();
                }}
              >
                Add to cart
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
