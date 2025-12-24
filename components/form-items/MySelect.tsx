import { Select, SelectItem } from "@heroui/react";
import { SelectHTMLAttributes } from "react";

export type Props = {
  options: Option[];
  variant?: "flat" | "bordered" | "underlined" | "faded";
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

export type Option = {
  key: string;
  label: string;
};

const MySelect = (props: Props) => {
  return (
    <Select
      className={props.className}
      label={props.label}
      placeholder={props.placeholder}
      variant={props.variant}
      isRequired={props.isRequired}
    >
      {props.options?.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default MySelect;
