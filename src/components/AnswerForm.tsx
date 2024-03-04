import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/lib";
import React from "react";
import {
  HorizontalBox,
  LabeledFormTextField,
  LoadingButton,
  VerticalBox,
} from ".";
import { Database } from "@/models/server";

const schema = yup.object({
  body: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;
const defaultValues: Partial<FormValues> = {
  body: "",
};

type Props = {
  questionId: number;
  afterSubmit: VoidFunction;
};

export default function AnswerForm(props: Props) {
  const user = useAppSelector((store) => store.user_info.data);
  const { handleSubmit, control, watch, reset } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const onSubmitForm: SubmitHandler<FormValues> = async (
    values: FormValues
  ) => {
    setLoading(true);
    await Database.CREATE_ANSWER({
      questionId: props.questionId,
      userId: user.id,
      body: values.body,
    });
    setLoading(false);
    reset();
    props.afterSubmit();
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSubmit(onSubmitForm)(event);
  };

  const body = watch("body");

  return (
    <VerticalBox>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <LabeledFormTextField
          rows={4}
          fullWidth
          control={control}
          name="body"
          title="پاسخ دهید"
          placeholder="متن پاسخ خود را بنویسید"
          sx={{ backgroundColor: "white" }}
          InputProps={{ style: { borderRadius: 6 } }}
        />
      </form>
      <HorizontalBox justifyContent={"end"}>
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={!body}
          onClick={handleSubmit(onSubmitForm)}
        >
          ارسال پاسخ
        </LoadingButton>
      </HorizontalBox>
    </VerticalBox>
  );
}
