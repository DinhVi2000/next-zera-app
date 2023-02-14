import store from "@/store";

import "@/styles/global.scss";
import "@/styles/custom.scss";

import { Provider } from "react-redux";

import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer theme="colored"  />
    </Provider>
  );
}
