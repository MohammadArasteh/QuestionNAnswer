import { createHashRouter, Navigate } from "react-router-dom";

import { Layout } from "@layouts/index";
import { QuestionPage, QuestionsPage, NewQuestionPage } from "@pages/index";

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
        loader: QuestionPage.loader,
      },
    ],
  },
]);

export default router;
