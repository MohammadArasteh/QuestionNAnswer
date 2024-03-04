import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LabeledFormTextField, LoadingButton } from "@/components";
import { grey } from "@mui/material/colors";
import { useAppSelector } from "@/lib";
import { Database } from "@/models/server";
import React from "react";

const schema = yup.object({
  title: yup.string().required(),
  body: yup.string().required(),
});

type FormValues = yup.InferType<typeof schema>;
const defaultValues: Partial<FormValues> = {
  title: "",
  body: "",
};

export default function NewQuestionPage() {
  const user = useAppSelector((store) => store.user_info.data);
  const navigate = useNavigate();
  const { handleSubmit, control, watch } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleClose = () => {
    navigate("/questions");
  };

  const onSubmitForm: SubmitHandler<FormValues> = async (
    values: FormValues
  ) => {
    setLoading(true);
    await Database.CREATE_QUESTION({
      title: values.title,
      body: values.body,
      userId: user.id,
    });
    setLoading(false);
    navigate("/questions", { state: { status: "OK" } });
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSubmit(onSubmitForm)(event);
  };

  const title = watch("title");
  const body = watch("body");

  return (
    <Dialog onClose={handleClose} open={true} maxWidth={"sm"} fullWidth>
      <DialogTitle>سوال جدید</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ backgroundColor: grey[100] }}>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <LabeledFormTextField
            fullWidth
            control={control}
            name="title"
            title="عنوان سوال"
            placeholder="برای سوال خود عنوان مشخص کنید"
            sx={{ backgroundColor: "white" }}
            InputProps={{ style: { borderRadius: 6 } }}
          />
          <LabeledFormTextField
            rows={4}
            fullWidth
            control={control}
            name="body"
            title="متن سوال"
            placeholder="متن سوال خود را بنویسید"
            sx={{ backgroundColor: "white" }}
            InputProps={{ style: { borderRadius: 6 } }}
          />
        </form>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: grey[100] }}>
        <Button variant="text" onClick={handleClose}>
          انصراف
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          disabled={!title || !body}
          onClick={handleSubmit(onSubmitForm)}
        >
          ایجاد سوال
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
