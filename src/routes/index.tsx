import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import Layout from "@/components/layout/Layout";
import App from "@/App";

// Static routes (pre-rendered)
const staticRoutes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/app",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
];

// Create the router (forms will be handled separately)
const router = createBrowserRouter(staticRoutes);

export default function Router() {
  return <RouterProvider router={router} />;
} 