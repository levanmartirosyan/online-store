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
  const {
    options,
    className,
    label,
    placeholder,
    variant,
    isRequired,
    ...rest
  } = props;

  return (
    <Select
      className={className}
      label={label}
      placeholder={placeholder}
      variant={variant}
      isRequired={isRequired}
      {...(rest as any)}
    >
      {options?.map((option) => (
        <SelectItem key={option.key}>{option.label}</SelectItem>
      ))}
    </Select>
  );
};

export default MySelect;
