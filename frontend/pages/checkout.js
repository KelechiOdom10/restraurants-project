import { Box } from "@chakra-ui/react";
import CheckoutSection from "../components/Checkout/CheckoutSection";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/Layout/NavBar";
import withAuth from "../hocs/withAuth";

export default withAuth(function checkout() {
  return (
    <Layout
      title="Le Restaurant | Checkout securely"
      description="Le Restaurant Checkout Page"
    >
      <NavBar />
      <Box borderX="5px solid black">
        <CheckoutSection />
      </Box>
      <Footer />
    </Layout>
  );
});
