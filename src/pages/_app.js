import store from "@/store";

import "@/styles/global.scss";
import "@/styles/custom.scss";
import "@/styles/responsive.scss";
import "@/styles/animation.scss";

import { Provider } from "react-redux";
import { ModalContextProvider } from "@/context/modal-context";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthContextProvider } from "@/context/auth-context";
import { SocketContextProvider } from "@/context/socket-context";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <AuthContextProvider>
          <SocketContextProvider>
            <ModalContextProvider>
              <Component {...pageProps} />
            </ModalContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </ChakraProvider>
    </Provider>
  );
}
