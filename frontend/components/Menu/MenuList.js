import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  HStack,
  Input,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import MenuItem from "./MenuItem";

export default function MenuList({ products, categories }) {
  let filteredProducts = products;
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("");

  const resetFilters = () => {
    setCategory("");
    setSearchValue("");
    filteredProducts = products;
  };

  if (searchValue.length > 0) {
    filteredProducts = filteredProducts.filter(
      product =>
        product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue) ||
        product.category.name.toLowerCase().includes(searchValue)
    );
  }

  return (
    <Box border="5px solid black" borderTop="0" minH="80vh">
      <Box maxW="6xl" mx={{ base: 4, md: "auto" }} py={10} px={{ md: 4 }}>
        <VStack px={4} spacing={3}>
          <Input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value.toLowerCase())}
            placeholder="Search menu by name, category etc."
            borderColor="black"
            borderWidth={3}
            bg="white"
          />
          <HStack w="full">
            <Select
              w={{ base: "60%", md: "80%" }}
              placeholder="Filter by Category"
              aria-label="Category dropdown"
              variant="filled"
              value={category}
              width="45%"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="semibold"
              onChange={e => setCategory(e.currentTarget.value)}
              isRequired
              borderColor="black"
              borderWidth={3}
            >
              {categories.map(category => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </Select>
            <Button
              w={{ base: "40%", md: "20%" }}
              colorScheme="red"
              ml={5}
              rounded="md"
              fontWeight="semibold"
              onClick={resetFilters}
            >
              Reset filters
            </Button>
          </HStack>
        </VStack>

        {filteredProducts.length < 1 ||
        filteredProducts.filter(product =>
          category ? product.category.name === category : true
        ) < 1 ? (
          <Alert status="info" fontSize={{ base: "sm", md: "md" }} my={8}>
            <AlertIcon />
            Oops no products returned, please refine your search!
          </Alert>
        ) : (
          <SimpleGrid
            columns={[1, 2, 2, 3]}
            my={8}
            spacingX="40px"
            spacingY="20px"
          >
            {" "}
            {products &&
              filteredProducts
                .filter(product =>
                  category ? product.category.name === category : true
                )
                .map(product => (
                  <MenuItem key={product._id} product={product} />
                ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
