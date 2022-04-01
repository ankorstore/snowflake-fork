import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </SessionProvider>
  );
}
