import store from "@/store";

import "@/styles/global.scss";
import "@/styles/custom.scss";
import "@/styles/responsive.scss";
import "@/styles/animation.scss";

import { Provider } from "react-redux";
import { ModalContextProvider } from "@/context/modal-context";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "@/context/auth-context";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthContextProvider>
          <ModalContextProvider>
            <Component {...pageProps} />
          </ModalContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </Provider>
  );
}
