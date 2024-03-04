import { HorizontalBox, Logo, VerticalBox } from "@/components";
import { Button, Divider, Pagination, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import { Server } from "@/models";
import { Database } from "@/models/server";
import { Question } from "@/components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/lib";
import { questionsSlice } from "@/store/slices";

export default function QuestionsPage() {
  const page = useAppSelector((store) => store.questions.currentPage);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [questions, setQuestions] = React.useState<Server.Entity.Question[]>(
    []
  );

  React.useEffect(() => {
    fetchQuestions();
  }, [page]);

  React.useEffect(() => {
    if (location.state && location.state.status === "OK") fetchQuestions();
  }, [location]);

  const fetchQuestions = async () => {
    const result = await Database.FETCH_QUESTIONS({
      pageSize: 3,
      pageNumber: page - 1,
    });
    setQuestions(result.data);
    setTotalCount(result.totalCount);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(questionsSlice.actions.setCurrentPage(value));
  };

  return (
    <>
      <VerticalBox height={"100%"}>
        <HorizontalBox justifyContent={"space-between"}>
          <Typography variant="h5" fontWeight={"bold"}>
            سوالات
          </Typography>
          <HorizontalBox gap={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => navigate("/questions/new")}
            >
              سوال جدید
            </Button>
            <Divider orientation="vertical" />
            <Logo />
          </HorizontalBox>
        </HorizontalBox>
        <VerticalBox overflow={"auto"} gap={0}>
          {questions.map((question, index) => (
            <Question key={index} question={question}>
              <Question.Header
                title={question.title}
                dateTime={question.dateTime}
                userId={question.userId}
              />
              <Divider />
              <Question.Body body={question.body} />
              <Question.Footer
                answersCount={question.answersCount}
                onViewDetails={() => navigate(`/question/${question.id}`)}
              />
            </Question>
          ))}
        </VerticalBox>
        <HorizontalBox justifyContent={"end"}>
          <Pagination
            color="primary"
            shape="rounded"
            count={Math.floor(totalCount / 3 + (totalCount % 3))}
            page={page}
            onChange={handlePageChange}
          />
        </HorizontalBox>
      </VerticalBox>
      <Outlet />
    </>
  );
}
