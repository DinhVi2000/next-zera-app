import store from "@/store";
import "@/styles/global.scss";
import "@/styles/custom_tailwind.scss";

import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
