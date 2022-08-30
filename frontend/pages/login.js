import { Box, Flex } from "@chakra-ui/layout";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/Layout/NavBar";
import LoginForm from "../components/Auth/LoginForm";
import withoutAuth from "../hocs/withoutAuth";

const Login = () => {
  return (
    <Layout
      title="Le Restaurant | Sign in"
      description="Le Restaurant Sign in Page"
    >
      <NavBar />
      <Flex
        display="flex"
        direction={{ base: "column", md: "row" }}
        minH={{ base: "80vh", sm: "60vh", md: "80vh" }}
        borderX="5px solid black"
        pb={{ base: "80px", md: 0 }}
      >
        <Flex
          w="40vw"
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
          w={{ base: "100%", md: "60vw" }}
          align={{ base: "start", md: "center" }}
          mx="auto"
          mt={{ base: 20, md: 0 }}
          bg="white"
        >
          <Box w="80%" mx="auto">
            <LoginForm />
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </Layout>
  );
};

export default withoutAuth(Login);
