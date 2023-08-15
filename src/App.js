// src/App.tsx

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import ScheduledToDo from "./pages/ScheduledToDo";
import FlexibleToDo from "./pages/FlexibleToDo";
import OverdueToDo from "./pages/OverdueToDo";
import Routine from "./pages/Routine";
import Setting from "./pages/Setting";

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
  return <RouterProvider router={router} />;
}

export default App;
