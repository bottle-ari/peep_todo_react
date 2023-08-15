import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy 로딩을 위해 컴포넌트를 비동기로 불러오기
const Root = lazy(() => import("./pages/Root"));
const ScheduledToDo = lazy(() => import("./pages/ScheduledToDo"));
const FlexibleToDo = lazy(() => import("./pages/FlexibleToDo"));
const OverdueToDo = lazy(() => import("./pages/OverdueToDo"));
const Routine = lazy(() => import("./pages/Routine"));
const Setting = lazy(() => import("./pages/Setting"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <ScheduledToDo />,
      },
      {
        path: "/flexibleToDo",
        element: <FlexibleToDo />,
      },
      {
        path: "/overdueToDo",
        element: <OverdueToDo />,
      },
      {
        path: "/routine",
        element: <Routine />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <Suspense fallback={<div>Loading...</div>}>
        {/* 다른 컴포넌트 */}
        {router}
      </Suspense>
    </RouterProvider>
  );
}

export default App;
