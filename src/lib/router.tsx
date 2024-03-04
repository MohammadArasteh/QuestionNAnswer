import { createHashRouter, Navigate } from "react-router-dom";

const router = createHashRouter([
  {
    path: "/",
    element: <Navigate to={"/questions"} />,
  },
  {
    path: "/questions",
    element: <div>questions</div>,
    children: [
      {
        path: "new",
        element: <div>modal</div>,
      },
    ],
  },
  {
    path: "/question/:id",
    element: <div>question</div>,
  },
]);

export default router;
