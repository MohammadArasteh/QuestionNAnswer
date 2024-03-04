import React from "react";
import { createHashRouter, Navigate } from "react-router-dom";

import { Layout } from "@layouts/index";
const NewQuestionPage = React.lazy(() => import("@pages/NewQuestionPage"));
const QuestionPage = React.lazy(() => import("@pages/QuestionPage"));
const QuestionsPage = React.lazy(() => import("@pages/QuestionsPage"));

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    loader: Layout.loader,
    children: [
      {
        index: true,
        element: <Navigate to="/questions" />,
      },
      {
        path: "/questions",
        element: <QuestionsPage />,
        children: [
          {
            path: "new",
            element: <NewQuestionPage />,
          },
        ],
      },
      {
        path: "/question/:id",
        element: <QuestionPage />,
      },
    ],
  },
]);

export default router;
