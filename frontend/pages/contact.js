import { Box, Flex } from "@chakra-ui/layout";
import ContactForm from "../components/Contact/ContactForm";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/Layout/NavBar";

const Contact = () => {
  return (
    <Layout
      title="Le Restaurant | Contact Us"
      description="Le Restaurant Contact Us Page"
    >
      <NavBar />
      <Flex
        display="flex"
        direction={{ base: "column", md: "row" }}
        minH={{ base: "100vh", sm: "60vh", md: "80vh" }}
        borderX="5px solid black"
        pb={{ base: "80px", md: 0 }}
      >
        <Flex
          w="30vw"
          display={{ base: "none", md: "flex" }}
          bg="gray.800"
          backgroundImage={`url(${"/images/login.jpg"})`}
          position="relative"
          backgroundSize="cover"
          backgroundPosition="center"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          borderRight="5px solid black"
        ></Flex>
        <Flex
          w={{ base: "100%", md: "50vw" }}
          align={{ base: "start", md: "center" }}
          mx="auto"
          mt={{ base: 10, md: 0 }}
        >
          <Box w="80%" mx="auto">
            <ContactForm />
          </Box>
        </Flex>
      </Flex>

      <Footer />
    </Layout>
  );
};

export default Contact;
