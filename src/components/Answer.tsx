import { Server } from "@/models";
import { Avatar, Button, Paper, Typography } from "@mui/material";
import { HorizontalBox, VerticalBox } from ".";
import React from "react";
import { Database } from "@/models/server";
import { getDate, getTime, useAppSelector } from "@/lib";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { AnswerReactionType } from "@/models/server/entity";

type Props = {
  answer: Server.Dto.Answer.Answer;
} & React.PropsWithChildren;

export default function Answer(props: Props) {
  return (
    <Paper sx={{ px: 2, py: 0.5, m: 1, borderRadius: 2 }} elevation={2}>
      <VerticalBox>{props.children}</VerticalBox>
    </Paper>
  );
}

type AnswerHeaderProps = {
  dateTime: Server.Entity.DateTime;
  userId: number;
};
Answer.Header = function Header(props: AnswerHeaderProps) {
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
        <Typography>{user?.userName}</Typography>
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

type AnswerBodyProps = {
  body: string;
};
Answer.Body = function Body(props: AnswerBodyProps) {
  return (
    <Typography mt={1} mb={1.5} component={"pre"} sx={{ textWrap: "wrap" }}>
      {props.body}
    </Typography>
  );
};

type AnswerFooterProps = {
  answerId: number;
  likesCount: number;
  dislikesCount: number;
  userReaction: Server.Entity.AnswerReactionType;
  onReact: (
    answerId: number,
    reactType: Server.Entity.AnswerReactionType
  ) => void;
};
Answer.Footer = function Footer(props: AnswerFooterProps) {
  return (
    <HorizontalBox
      alignItems={"center"}
      mb={2}
      justifyContent={"space-between"}
    >
      <HorizontalBox alignItems={"center"} color={"gray"}>
        <HorizontalBox>
          <Typography>{props.likesCount}</Typography>
          <SentimentSatisfiedIcon
            color={
              props.userReaction === AnswerReactionType.LIKED
                ? "success"
                : undefined
            }
          />
        </HorizontalBox>
        <HorizontalBox>
          <Typography>{props.dislikesCount}</Typography>
          <SentimentDissatisfiedIcon
            color={
              props.userReaction === AnswerReactionType.DISLIKED
                ? "error"
                : undefined
            }
          />
        </HorizontalBox>
      </HorizontalBox>
      <HorizontalBox>
        <Button
          startIcon={<SentimentSatisfiedIcon />}
          variant="outlined"
          color="success"
          onClick={() =>
            props.onReact(
              props.answerId,
              props.userReaction === AnswerReactionType.LIKED
                ? AnswerReactionType.NONE
                : AnswerReactionType.LIKED
            )
          }
        >
          پاسخ خوب
        </Button>
        <Button
          startIcon={<SentimentDissatisfiedIcon />}
          variant="outlined"
          color="error"
          onClick={() =>
            props.onReact(
              props.answerId,
              props.userReaction === AnswerReactionType.DISLIKED
                ? AnswerReactionType.NONE
                : AnswerReactionType.DISLIKED
            )
          }
        >
          پاسخ بد
        </Button>
      </HorizontalBox>
    </HorizontalBox>
  );
};
