import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import LoadingScreen from "../components/Layout/Loading";
import NavBar from "../components/Layout/NavBar";
import OrderSection from "../components/Order/OrderSection";
import withAuth from "../hocs/withAuth";
import { getMyOrders } from "../services";

export default withAuth(function orders() {
  const {
    isLoading,
    isSuccess,
    error,
    isError,
    data: orders,
  } = useQuery("orders", getMyOrders);

  return (
    <Layout
      title="Le Restaurant | View Your Orders"
      description="Le Restaurant Orders Page"
    >
      <NavBar />
      {isLoading && <LoadingScreen />}
      {isError && (
        <Text p={4}>An {error} occurred, please refresh the page</Text>
      )}
      {isSuccess && <OrderSection orders={orders.data} />}
      <Footer />
    </Layout>
  );
});
