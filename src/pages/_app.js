import { ListProvider } from "@/context/list_context";
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
