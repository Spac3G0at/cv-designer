/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router";
import Homepage from "../pages/Homepage";
import CVEditor from "../pages/CVEditor";
import NotFound from "../pages/NotFound";
import Loader from "../pages/Loader";
import { Suspense } from "react";
import mock from "../assets/mock.json";

// Loader for CV route
const loadCVData = async () => {
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
  { path: "/", element: <Homepage /> },
  {
    path: "cv-editor",
    element: (
      <Suspense fallback={<Loader />}>
        <CVEditor />
      </Suspense>
    ),
    // loader: loadCVData,
    // errorElement: <Navigate to="/404" />,
  },
  {
    path: "404",
    element: <NotFound />,
  },
]);

// eslint-disable-next-line react-refresh/only-export-components
export default router;
