import withFixedLabel, {
  FixedLabelProps,
} from "@/components/HOC/withFixedLabel";
import { FormTextarea } from ".";
import type { FormTextareaProps } from "./FormTextarea";
import type { FieldValues } from "react-hook-form";

export default function LabeledFormTextarea<F extends FieldValues>(
  props: FormTextareaProps<F> & FixedLabelProps
) {
  return withFixedLabel<FormTextareaProps<F>>(FormTextarea)(props);
}
