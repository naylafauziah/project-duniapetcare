import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import Root from "./root";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Layout from "@/pages/layout";
import Profile from "@/pages/profile";
import AuthRoute from "./auth-route";
import ProtectedRoute from "./protected-route";
import Landing from "@/pages/landing";
import Article from "@/pages/article";
import Error from "@/pages/error";
import App from "@/App";
import Booking from "@/pages/booking";
import AdminRoute from "./admin-route";
import Services from "@/pages/services";
import ListUser from "@/pages/list-user";

function RoutesComponent() {
  const routes: RouteObject[] = [
    {
      element: <Root className="font-plus-jakarta-sans" />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/testing",
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
              path: "/booking",
              element: <Booking />,
            },
            {
              path: "/services",
              element: <Services />,
            },
            {
              element: <AdminRoute />,
              children: [
                {
                  element: <Layout />,
                  children: [
                    {
                      path: "/profile",
                      element: <Profile />,
                    },
                    {
                      path: "/article",
                      element: <Article />,
                    },
                    {
                      path: "/dashboard",
                      element: <Dashboard />,
                    },
                    {
                      path: "/list-user",
                      element: <ListUser />,
                    },
                  ],
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
