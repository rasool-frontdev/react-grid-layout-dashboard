import { createBrowserRouter } from "react-router-dom";

import Layout from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login";
import NotFound from "@/pages/notFound";

import ProtectedRoute from "./protectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, 
  },
  {
    path: "*",
    element: <NotFound />, 
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />, 
      },
    ],
  },
]);
