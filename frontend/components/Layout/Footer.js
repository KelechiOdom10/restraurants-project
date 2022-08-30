import {
  SimpleGrid,
  Box,
  Flex,
  Link,
  Icon,
  Divider,
  Text,
  Heading,
} from "@chakra-ui/react";
import {
  RiInstagramLine,
  RiTwitterFill,
  RiFacebookBoxFill,
} from "react-icons/ri";

const FooterIconLink = ({ icon, path }) => {
  return (
    <Link href={path} isExternal _hover={{ textDecoration: "none" }} my={1}>
      <Icon as={icon} fontSize="lg" color="white" mr={4} />
    </Link>
  );
};

const FooterLink = ({ text, path }) => {
  return (
    <Link href={path} my={2} fontSize={{ base: "sm", md: "md" }}>
      {text}
    </Link>
  );
};

const FooterHeader = ({ text }) => {
  return (
    <Heading my={1} fontSize={{ base: "lg", md: "xl" }} color="white">
      {text}
    </Heading>
  );
};

const FooterText = ({ text }) => {
  return (
    <Text fontSize={{ base: "sm", md: "md" }} color="white" my={3}>
      {text}
    </Text>
  );
};

const FooterContainer = ({ children }) => {
  return <Box maxWidth={{ base: "100%" }}>{children}</Box>;
};

function Footer() {
  return (
    <Flex
      direction="column"
      alignItems={{ base: "flex-start", md: "center" }}
      bg="gray.800"
      color="white"
      py={8}
      px={{ base: 8, md: 16 }}
    >
      <SimpleGrid columns={[1, 2, 2, 3]} spacingX="80px" spacingY="20px" mb={4}>
        <FooterContainer>
          <Flex>
            <FooterIconLink icon={RiFacebookBoxFill} />
            <FooterIconLink icon={RiTwitterFill} />
            <FooterIconLink icon={RiInstagramLine} />
          </Flex>
          <Flex direction="column">
            <FooterLink text="Privacy Policy" path="#" />
            <FooterLink text="Terms & Conditions" path="#" />
          </Flex>
        </FooterContainer>
        <FooterContainer>
          <FooterHeader text="Opening Hours" />
          <FooterText text="Mon-Fri: 9:00 AM - 06:00 PM" />
          <FooterText text="Saturday: 9:00 AM - 05:00 PM" />
          <FooterText text="Sunday: Closed" />
        </FooterContainer>

        <FooterContainer>
          <FooterHeader text="Help" />
          <Flex direction="column">
            <FooterLink text="Orders" path="orders" />
            <FooterLink text="Bookings" path="bookings" />
            <FooterLink text="Contact Us" path="contact" />
          </Flex>
        </FooterContainer>
      </SimpleGrid>
      <Divider />
      <FooterText
        text={`© Project-C Restaurants | ${new Date().getFullYear()}. All rights reserved`}
      />
    </Flex>
  );
}

export default Footer;
