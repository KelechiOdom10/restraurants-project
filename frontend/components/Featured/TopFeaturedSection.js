import {
  Flex,
  useBreakpointValue,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import TopFeaturedItem from "./TopFeaturedItem";

export default function TopFeaturedSection({ products }) {
  return (
    <Flex
      direction="column"
      border="5px solid black"
      borderTop="0px"
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
        POPULAR ITEMS
      </Text>
      <Heading
        fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
        my={2}
        w={{ base: "100%", md: "90%" }}
      >
        Explore our best menu items
      </Heading>
      <Flex
        overflowX="auto"
        width="100%"
        flexWrap="nowrap"
        alignItems="center"
        justifyContent={{ base: "flex-start", md: "space-between" }}
      >
        {products.map(item => (
          <TopFeaturedItem key={item._id} item={item} />
        ))}
      </Flex>

      <Button
        as={Link}
        variant="solid"
        bg="gray.800"
        color="white"
        my={4}
        size={useBreakpointValue({ base: "sm", sm: "md" })}
        href="/menu"
        _hover={{
          textDecoration: "none",
          bg: "gray.800",
        }}
      >
        View All
      </Button>
    </Flex>
  );
}
