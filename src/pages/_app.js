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
import { usePreviousRoute } from "@/hooks/usePreviousRoute";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  usePreviousRoute();
  return (
    <Provider store={store}>
      <ChakraProvider>
        <SocketContextProvider>
          <AuthContextProvider>
            <ModalContextProvider>
              <Component {...pageProps} />
            </ModalContextProvider>
          </AuthContextProvider>
        </SocketContextProvider>
      </ChakraProvider>
    </Provider>
  );
}
