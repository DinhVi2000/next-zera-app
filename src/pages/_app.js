import store from "@/store";

import "@/styles/global.scss";
import "@/styles/custom.scss";

import { Provider } from "react-redux";
import { ModalContextProvider } from "@/context/modal-context";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ModalContextProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ModalContextProvider>
    </ChakraProvider>
  );
}
