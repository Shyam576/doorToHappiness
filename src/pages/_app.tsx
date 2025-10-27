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
import Script from "next/script";

import { AuthProvider } from "../context/AuthContext";
import { Footer } from "../components/Footer";
import { store } from "../store/store";
import { NavBar } from "../components/NavBar";
import { AdminNav } from "../components/AdminNav";
import "../components/styles/global.css";
import "../FontAwesomeConfig";

const persistor = getPersistor();

// Axios setup
if (typeof window !== 'undefined') {
  axios.defaults.baseURL = window.location.origin;
} else {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
}
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
  const protectedRoutes = ["/admin", "/admin/dashboard", "/admin/destination","/admin/majorCityPackage"];
  const isProtected = protectedRoutes.includes(pathname);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-3F4SEE8C0J"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3F4SEE8C0J', { page_path: window.location.pathname });
          `,
        }}
      />
      
      <SWRConfig value={{ fetcher, dedupingInterval: 5000 }}>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {isProtected ? (
                <AuthProvider>
                  <IoProvider>
                    <AdminNav />
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
    </>
  );
};

export default MyApp;
