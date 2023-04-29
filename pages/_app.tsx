import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps;

  return (
    <UserProvider user={user}>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
