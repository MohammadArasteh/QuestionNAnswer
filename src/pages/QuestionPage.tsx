import {
  Answer,
  HorizontalBox,
  Logo,
  Question,
  VerticalBox,
} from "@/components";
import LabeledBox from "@/components/box/LabeledBox";
import { useAppSelector } from "@/lib";
import { Server } from "@/models";
import { Database } from "@/models/server";
import { AnswerReactionType } from "@/models/server/entity";
import { Button, Divider, Pagination, Typography } from "@mui/material";
import React from "react";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

export default function QuestionPage() {
  const user = useAppSelector((store) => store.user_info.data);
  const navigate = useNavigate();
  const { data: question } =
    useLoaderData() as Server.Dto.Question.GetQuestionResponse;

  const [page, setPage] = React.useState<number>(1);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [answers, setAnswers] = React.useState<Server.Dto.Answer.Answer[]>([]);

  React.useEffect(() => {
    if (user.id) fetchAnswers();
  }, [page, user]);

  const fetchAnswers = async () => {
    if (!question) return;
    const result = await Database.FETCH_ANSWERS({
      currentUserId: user.id,
      questionId: question.id,
      pageSize: 3,
      pageNumber: page - 1,
    });
    setAnswers(result.data);
    setTotalCount(result.totalCount);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onAnswerReact = React.useCallback(
    async (answerId: number, reaction: AnswerReactionType) => {
      const result = await Database.REACT_ANSWER({
        answerId,
        reaction,
        userId: user.id,
      });
      setAnswers((answers) => {
        const index = answers.findIndex((answer) => answer.id === answerId);
        const list = structuredClone(answers);
        list[index] = result.data;
        return list;
      });
    },
    [answers]
  );

  if (!question) return null;

  return (
    <VerticalBox height={"100%"}>
      <HorizontalBox justifyContent={"space-between"}>
        <Typography variant="h5" fontWeight={"bold"}>
          سوال
        </Typography>
        <HorizontalBox gap={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/questions")}
          >
            بازگشت
          </Button>
          <Divider orientation="vertical" />
          <Logo />
        </HorizontalBox>
      </HorizontalBox>
      <VerticalBox overflow={"auto"} gap={2}>
        <LabeledBox
          title="سوال"
          labelProps={{
            style: { fontSize: "1rem", color: "black" },
          }}
        >
          <Question question={question}>
            <Question.Header
              title={question.title}
              dateTime={question.dateTime}
              userId={question.userId}
            />
            <Divider />
            <Question.Body body={question.body} />
            <Question.Footer answersCount={question.answersCount} />
          </Question>
        </LabeledBox>
        <LabeledBox
          title="پاسخ‌ها"
          labelProps={{
            style: { fontSize: "1rem", color: "black" },
          }}
        >
          <VerticalBox>
            {answers.map((answer, index) => (
              <Answer key={index} answer={answer}>
                <Answer.Header
                  dateTime={answer.dateTime}
                  userId={answer.userId}
                />
                <Divider />
                <Answer.Body body={answer.body} />
                <Answer.Footer
                  answerId={answer.id}
                  dislikesCount={answer.dislikesCount}
                  likesCount={answer.likesCount}
                  userReaction={answer.userReaction}
                  onReact={onAnswerReact}
                />
              </Answer>
            ))}
          </VerticalBox>
        </LabeledBox>
        <HorizontalBox justifyContent={"end"}>
          <Pagination
            color="primary"
            shape="rounded"
            count={Math.ceil(totalCount / 3)}
            page={page}
            onChange={handlePageChange}
          />
        </HorizontalBox>
      </VerticalBox>
    </VerticalBox>
  );
}

QuestionPage.loader = async (args: LoaderFunctionArgs) => {
  const id = args.params.id;
  const result = await Database.FETCH_QUESTION({ questionId: Number(id) });
  return result;
};
