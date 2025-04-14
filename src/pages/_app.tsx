import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import axios from "axios";
import { PersistGate } from "redux-persist/lib/integration/react";
import { getPersistor } from "@rematch/persist";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { IoProvider } from "socket.io-react-hook";

import { AuthProvider } from "../context/AuthContext";
import { Footer } from "../components/Footer";
import { store } from "../store/store";
import { NavBar } from "../components/NavBar";
import "../components/styles/global.css";
import "../FontAwesomeConfig";

const persistor = getPersistor();

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = false;

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err: any) {
    throw err.response.data;
  }
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const protectedRoutes = ["/admin", "/admin/dashboard", "/admin/settings","/admin/majorCityPackage"];
  const isProtected = protectedRoutes.includes(pathname);

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 5000,
      }}
    >
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {isProtected ? (
              <AuthProvider>
                <IoProvider>
                  <NavBar />
                  <Component {...pageProps} />
                  <Footer />
                </IoProvider>
              </AuthProvider>
            ) : (
              <IoProvider>
                <NavBar />
                <Component {...pageProps} />
                <Footer />
              </IoProvider>
            )}
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </SWRConfig>
  );
};

export default MyApp;
