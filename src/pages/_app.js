import { CategoryProvider } from "@/context/category_context";
import { ConstantTodoProvider } from "@/context/constant_todo_context";
import { ScheduledTodoProvider } from "@/context/scheduled_todo_context";
import { RoutineProvider } from "@/context/routine_context";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);

  return (
    <CategoryProvider>
      <ScheduledTodoProvider>
        <ConstantTodoProvider>
          <RoutineProvider>
            <Head>
              <link rel="shortcut icon" href="/images/logo.svg" />
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RoutineProvider>
        </ConstantTodoProvider>
      </ScheduledTodoProvider>
    </CategoryProvider>
  );
}
