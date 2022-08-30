import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import MenuList from "../components/Menu/MenuList";
import NavBar from "../components/Layout/NavBar";
import { getAllCategories, getAllProducts } from "../services/index";

// const categories = [
//   {
//     id: 1,
//     name: "Main",
//   },
//   { id: 2, name: "Starter" },
//   { id: 3, name: "Side" },
//   { id: 4, name: "Dessert" },
// ];

// const products = [
//   {
//     product: 1,
//     title: "Eforiro Assorted",
//     description: "Vegetable spinach soup made with meat and some cheeky Eba",
//     price: 7.5,
//     rating: "4.5",
//     category: "Main",
//     image:
//       "http://www.maryshut.com.ng/wp-content/uploads/2018/08/eforiro-soup1-1-600x400.jpg",
//   },
//   {
//     product: 2,
//     title: "Red Ofada Stew",
//     description: "Western Nigerian stew commonly eaten ...",
//     price: 6.5,
//     rating: "5.0",
//     category: "Side",
//     image:
//       "https://www.yummymedley.com/wp-content/uploads/2018/05/Ofada-Stew-Nigerian-Ofada-Sauce-13-500x500.jpg",
//   },
//   {
//     product: 3,
//     title: "Red Ofada Stew",
//     description: "Western Nigerian stew commonly eaten ...",
//     price: 6.5,
//     rating: "5.0",
//     category: "Starter",
//     image:
//       "https://www.yummymedley.com/wp-content/uploads/2018/05/Ofada-Stew-Nigerian-Ofada-Sauce-13-500x500.jpg",
//   },
//   {
//     product: 4,
//     title: "Eforiro Assorted",
//     description: "Vegetable spinach soup made with meat and some cheeky Eba",
//     price: 7.5,
//     rating: 4.5,
//     category: "Main",
//     image:
//       "http://www.maryshut.com.ng/wp-content/uploads/2018/08/eforiro-soup1-1-600x400.jpg",
//   },
//   {
//     product: 5,
//     title: "Eforiro Assorted",
//     description: "Vegetable spinach soup made with meat and some cheeky Eba",
//     price: 7.5,
//     rating: 4.5,
//     category: "Side",
//     image:
//       "http://www.maryshut.com.ng/wp-content/uploads/2018/08/eforiro-soup1-1-600x400.jpg",
//   },
//   {
//     product: 6,
//     title: "Eforiro Assorted",
//     description: "Vegetable spinach soup made with meat and some cheeky Eba",
//     price: 7.5,
//     rating: 4.5,
//     category: "Side",
//     image:
//       "http://www.maryshut.com.ng/wp-content/uploads/2018/08/eforiro-soup1-1-600x400.jpg",
//   },
//   {
//     product: 7,
//     title: "Eforiro Assorted",
//     description: "Vegetable spinach soup made with meat and some cheeky Eba",
//     price: 7.5,
//     rating: 4.5,
//     category: "Main",
//     image:
//       "http://www.maryshut.com.ng/wp-content/uploads/2018/08/eforiro-soup1-1-600x400.jpg",
//   },
//   {
//     product: 8,
//     title: "Eforiro Assorted",
//     description: "Vegetable spinach soup made with meat and some cheeky Eba",
//     price: 7.5,
//     rating: 4.5,
//     category: "Dessert",
//     image:
//       "http://www.maryshut.com.ng/wp-content/uploads/2018/08/eforiro-soup1-1-600x400.jpg",
//   },
// ];

const Menu = ({ products, categories }) => {
  return (
    <Layout
      title="Le Restaurant | See our best menus"
      description="Le Restaurant - Menu Items"
    >
      <NavBar />
      <MenuList categories={categories} products={products} />
      <Footer />
    </Layout>
  );
};

export default Menu;

export async function getStaticProps() {
  const categories = await getAllCategories();
  const products = await getAllProducts();

  if (!categories || !products) {
    return {
      props: {
        isError: true,
        message: "error",
        categories: [],
        products: [],
      },
    };
  } else {
    return {
      props: {
        isError: false,
        message: "success",
        categories: categories.data.data,
        products: products.data.data,
      },
    };
  }
}
