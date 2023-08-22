import { ListProvider } from "@/context/list_context";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <ListProvider>
      <Head>
        <link rel="shortcut icon" href="/images/logo.svg" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ListProvider>
  );
}
