import { SessionProvider } from "next-auth/react";
import { AppProvider } from "../context/AppContext";
import Layout from "../components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  </SessionProvider>
);

export default App;
