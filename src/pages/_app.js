import { ListProvider } from "@/context/ListContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <ListProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ListProvider>
  );
}
