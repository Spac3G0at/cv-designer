/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router";
import Homepage from "../pages/Homepage";
import CVEditor from "../pages/CVEditor";
import NotFound from "../pages/NotFound";
import Loader from "../pages/Loader";
import { Suspense } from "react";
import mock from "../assets/mock.json";
import Layout from "../pages/Layout";
import EmptyLayout from "../pages/EmptyLayout";
import ResumeViewPage from "../pages/ResumeViewPage";

// Loader for CV route
const loadCVData = async (id) => {
  console.log(id);
  if (!localStorage.getItem("cv")) {
    localStorage.setItem("cv", JSON.stringify(mock));
  }

  const data = JSON.parse(localStorage.getItem("cv") ?? JSON.stringify(mock));

  let cvData = await new Promise((res) =>
    setTimeout(() => {
      return res(data);
    }, 1000)
  );

  return cvData;
};

export function HydrateFallback() {
  return <Loader />;
}
// Define routes with loaders
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Navigate to="/404" replace />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />, // Redirect from `/` to `/dashboard`
      },
      {
        path: "dashboard",
        element: <Homepage />,
      },
    ],
  },
  {
    path: "cv-editor",
    element: (
      <Suspense fallback={<Loader />}>
        <CVEditor />
      </Suspense>
    ),
  },
  {
    path: "p",
    element: <EmptyLayout />,
    children: [
      {
        path: ":id",
        element: <ResumeViewPage />,
        loader: ({ params }) => loadCVData(params.id),
        errorElement: <Navigate to="/404" replace />,
      },
    ],
  },
  {
    path: "404",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export default router;
