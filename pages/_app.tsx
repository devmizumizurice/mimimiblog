import { UserProvider } from "@auth0/nextjs-auth0";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import "../styles/globals.css";

import ProgressBar from "@badrap/bar-of-progress";
import { Router } from "next/router";

const progress = new ProgressBar({
  size: 3,
  color: "#F06292",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

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
