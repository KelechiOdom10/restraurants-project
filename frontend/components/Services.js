import { SimpleGrid, Box, Flex, Text, Heading } from "@chakra-ui/react";
import Feature from "./Service";
import { IoFastFood, IoBicycle, IoFastFoodOutline } from "react-icons/io5";

function Services() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      border="5px solid black"
      borderTop="0px"
    >
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        px={{ base: 6, md: 16, lg: 24 }}
        py={{ base: 6, md: 10 }}
      >
        <Text
          fontWeight="bold"
          py={2}
          fontSize={{ base: "xs", md: "sm" }}
          color="red.500"
        >
          HOW IT WORKS
        </Text>
        <Heading
          fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
          my={2}
        >
          Why order from us?
        </Heading>

        <SimpleGrid
          columns={[1, 2, 2, 3]}
          my={8}
          mx={4}
          spacingX="40px"
          spacingY="20px"
        >
          <Feature
            icon={IoFastFood}
            title="Fresh Food"
            description="Every meal ordered is cooked fresh and packaged carefully to preserve quality."
          />
          <Feature
            icon={IoFastFoodOutline}
            title="Super Taste"
            description="Every meal ordered is cooked fresh and packaged carefully to preserve quality."
          />
          <Feature
            icon={IoBicycle}
            title="Fast Delivery"
            description="We aim to deliver your food within 15 minutes after preparation."
          />
        </SimpleGrid>
      </Flex>
    </Box>
  );
}

export default Services;
