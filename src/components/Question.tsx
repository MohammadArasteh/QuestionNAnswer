import { Server } from "@/models";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { HorizontalBox, VerticalBox } from ".";
import React from "react";
import { Database } from "@/models/server";
import { getDate, getTime } from "@/lib";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

type Props = {
  question: Server.Entity.Question;
} & React.PropsWithChildren;

export default function Question(props: Props) {
  return (
    <Paper sx={{ px: 2, py: 0.5, m: 1, borderRadius: 2 }} elevation={2}>
      <VerticalBox>{props.children}</VerticalBox>
    </Paper>
  );
}

type QuestionHeaderProps = {
  title: string;
  dateTime: Server.Entity.DateTime;
  userId: number;
};
Question.Header = function Header(props: QuestionHeaderProps) {
  const [user, setUser] = React.useState<Server.Entity.User | null>(null);

  React.useEffect(() => {
    Database.FETCH_USER({
      id: props.userId,
    }).then((result) => setUser(result.data));
  }, [props.userId]);

  return (
    <HorizontalBox justifyContent={"space-between"} alignItems={"center"}>
      <HorizontalBox alignItems={"center"}>
        <Avatar
          sx={{ borderRadius: 2 }}
          variant="rounded"
          src={user?.imageUrl}
          alt="avatar image"
        />
        <Typography>{props.title}</Typography>
      </HorizontalBox>
      <HorizontalBox alignItems={"center"} height={"fit-content"}>
        <Typography
          fontSize={"0.8rem"}
          borderRight={"1px solid #d0d0d0"}
          paddingRight={1}
        >
          ساعت: <strong>{getTime(props.dateTime)}</strong>
        </Typography>
        <Typography fontSize={"0.8rem"} paddingLeft={1}>
          تاریخ: <strong>{getDate(props.dateTime)}</strong>
        </Typography>
      </HorizontalBox>
    </HorizontalBox>
  );
};

type QuestionBodyProps = {
  body: string;
};
Question.Body = function Body(props: QuestionBodyProps) {
  return (
    <Typography mt={1} mb={1.5} component={"pre"} sx={{ textWrap: "wrap" }}>
      {props.body}
    </Typography>
  );
};

type QuestionFooterProps = {
  answersCount: number;
  onViewDetails?: VoidFunction;
};
Question.Footer = function Footer(props: QuestionFooterProps) {
  return (
    <HorizontalBox
      alignItems={"center"}
      mb={2}
      justifyContent={"space-between"}
    >
      <HorizontalBox alignItems={"center"} color={"gray"}>
        <QuestionAnswerIcon />
        <Typography>تعداد پاسخ ها: {props.answersCount}</Typography>
      </HorizontalBox>
      {props.onViewDetails && (
        <Button
          onClick={props.onViewDetails}
          variant="outlined"
          color="primary"
        >
          مشاهده جزئیات
        </Button>
      )}
    </HorizontalBox>
  );
};
