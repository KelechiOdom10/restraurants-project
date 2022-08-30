import ContactUsSection from "../components/Contact/ContactUsSection";
import Footer from "../components/Layout/Footer";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import NavBar from "../components/Layout/NavBar";
import Services from "../components/Services";
import TopFeaturedSection from "../components/Featured/TopFeaturedSection";
import { getAllProducts } from "../services";

const Index = ({ featuredProducts }) => {
  const products = featuredProducts
    ?.filter(
      product =>
        product.category.name != "Sides" || product.category.name != "Drinks"
    )
    ?.sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  return (
    <Layout
      title="Le Restaurant | Order your best meals through us"
      description="Le Restaurant - Delicious food directly at your footsteps"
    >
      <NavBar />
      <Hero />
      <Services />
      <TopFeaturedSection products={products} />
      <ContactUsSection />
      <Footer />
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const featuredProducts = await getAllProducts();

  if (!featuredProducts) {
    return {
      props: {
        isError: true,
        message: "error",
        products: [],
      },
    };
  } else {
    return {
      props: {
        isError: false,
        message: "success",
        featuredProducts: featuredProducts.data.data,
      },
    };
  }
}
