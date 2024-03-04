import { TextareaAutosize, TextareaAutosizeProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

export type FormTextareaProps<Field extends FieldValues> = {
  name: Path<Field>;
  control: Control<Field>;
} & TextareaAutosizeProps;

export default function FormTextarea<Field extends FieldValues>({
  control,
  name,
  ...props
}: FormTextareaProps<Field>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState: { errors } }) => {
        const error = errors[field.name];
        return <TextareaAutosize {...props} {...field} />;
      }}
    />
  );
}
