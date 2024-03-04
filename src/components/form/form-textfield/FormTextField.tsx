import React from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  ControllerRenderProps,
} from "react-hook-form";
import { TextField, type TextFieldProps } from "@mui/material";
import { getValue } from "@/lib";

export type FormTextFieldProps<Field extends FieldValues> = {
  control: Control<Field>;
  name: Path<Field>;
  masked?: boolean;
} & TextFieldProps;

export default function FormTextField<T extends FieldValues>(
  props: FormTextFieldProps<T>
) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const commonProps: TextFieldProps = {
    autoComplete: "off",
    inputRef,
    multiline: !!props.rows,
  };

  const onTextFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    field: ControllerRenderProps<T>
  ) => {
    if (props.onChange) props.onChange(e);
    field.onChange(e);
  };

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, formState: { errors } }) => {
        const error = getValue(errors, field.name);
        return (
          <TextField
            {...props}
            {...field}
            {...commonProps}
            onChange={(e) => onTextFieldChange(e, field)}
            error={!!error}
            helperText={error ? (error.message as string) : null}
          />
        );
      }}
    />
  );
}
