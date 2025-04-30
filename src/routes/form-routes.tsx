import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicFormPage from "../pages/forms/[userId]";

// Create a dedicated router for form routes that will be client-side rendered
const formRouter = createBrowserRouter([
  {
    path: "/forms/:userId",
    element: <PublicFormPage />,
  },
]);

export default function FormRouter() {
  return <RouterProvider router={formRouter} />;
} 