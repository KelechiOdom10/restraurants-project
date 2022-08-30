import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { AuthProvider } from "../context/auth";
import { CartProvider } from "../context/cart";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import theme from "../utils/theme";
import React from "react";

function MyApp({ Component, pageProps }) {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }

  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider
        options={{
          initialColorMode: "light",
          useSystemColorMode: false,
        }}
        value="light"
      >
        <AuthProvider>
          <CartProvider>
            <QueryClientProvider client={queryClientRef.current}>
              <Hydrate state={pageProps.dehydratedState}>
                <Component {...pageProps} />
              </Hydrate>
            </QueryClientProvider>
          </CartProvider>
        </AuthProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
