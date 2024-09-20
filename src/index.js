import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./state/index";

import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";

const Add = lazy(() => import("./pages/Add"));
const Edit =lazy(() => import("./pages/Edit"));
const Detail =lazy(() => import("./pages/Detail"));

const postParamsHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", {
      statusText: "please use param integer",
      status: 400,
    });
  }
};

const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      {
        path: "psot/add",
        element: (
          <Suspense fallback={"please wait..."}>
            <Add />
          </Suspense>
        ),
      },
      {
        path: "post/:id",
        element: (
          <Suspense fallback={"please wait..."}>
            <Detail />
          </Suspense>
        ),
        loader: postParamsHandler,
      },
      {
        path: "post/:id/edit",
        element: (
          <Suspense fallback={"please wait..."}>
            <Edit />
          </Suspense>
        ),
        loader: postParamsHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={routers} />
  </Provider>
);
