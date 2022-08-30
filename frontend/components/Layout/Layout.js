import { Box } from "@chakra-ui/layout";
import Head from "next/head";
const Layout = ({ children, title, description, ...props }) => (
  <Box
    minH="100vh"
    position="relative"
    {...props}
    backgroundImage="url(https://www.transparenttextures.com/patterns/asfalt-dark.png)"
  >
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/restaurant.ico" type="image/x-icon" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
      <meta name="description" content={description} />
    </Head>
    {children}
  </Box>
);

export default Layout;
