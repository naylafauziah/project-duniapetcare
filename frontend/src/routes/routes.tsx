import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Root from "./root";
import App from "@/App";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Layout from "@/pages/layout";
import Profile from "@/pages/profile";
import DashboardPage from "@/pages/dashboard";
import AuthRoute from "./auth-route";
import ProtectedRoute from "./protected-route";

function RoutesComponent() {
  const routes: RouteObject[] = [
    {
      element: <Root className="font-plus-jakarta-sans" />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          element: <AuthRoute />,
          children: [
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
          ],
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  path: "/profile",
                  element: <Profile />,
                },
                {
                  path: "/dashboard",
                  element: <DashboardPage />,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default RoutesComponent;
