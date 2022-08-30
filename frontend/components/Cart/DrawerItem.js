import {
  Flex,
  Heading,
  HStack,
  Image,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Text,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";
import { useCart } from "../../context/cart";

export default function DrawerItem({ item, imageWidth = "60px" }) {
  const { updateItem, removeItem } = useCart();
  return (
    <Flex
      align="center"
      justify="space-between"
      my={4}
      borderWidth={3}
      p={4}
      borderColor="black"
      bg="white"
      w="full"
    >
      <HStack>
        <AspectRatio w={imageWidth} ratio={1}>
          <Image src={item.image} rounded="md" alt={item.name} />
        </AspectRatio>
        <VStack align="start">
          <Heading fontSize={{ base: "md", md: "lg" }}>{item.name}</Heading>
          <Text
            color="gray.600"
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
          >
            £{item.price.toFixed(2)}
          </Text>
        </VStack>
      </HStack>

      <VStack align="flex-end">
        <NumberInput
          defaultValue={item.quantity}
          size="sm"
          max={100}
          w={{ base: "60px", md: "100px" }}
          onChange={value => {
            if (value === "") {
              return;
            }
            updateItem(item.product, value);
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <Button
          variant="link"
          colorScheme="red"
          fontSize={{ base: "sm", md: "md" }}
          onClick={() => removeItem(item.product)}
        >
          REMOVE
        </Button>
      </VStack>
    </Flex>
  );
}
