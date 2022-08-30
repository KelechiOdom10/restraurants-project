import { Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import BookingSection from "../components/Booking/BookingSection";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import LoadingScreen from "../components/Layout/Loading";
import NavBar from "../components/Layout/NavBar";
import withAuth from "../hocs/withAuth";
import { getMyBookings } from "../services";

export default withAuth(function bookings() {
  const {
    isLoading,
    isSuccess,
    error,
    isError,
    data: bookings,
  } = useQuery("bookings", getMyBookings);

  return (
    <Layout
      title="Le Restaurant | Book a Table with us"
      description="Le Restaurant Bookings Page"
    >
      <NavBar />
      {isLoading && <LoadingScreen />}
      {isError && (
        <Text p={4}>An {error} occurred, please refresh the page</Text>
      )}
      {isSuccess && <BookingSection bookings={bookings.data} />}
      <Footer />
    </Layout>
  );
});
