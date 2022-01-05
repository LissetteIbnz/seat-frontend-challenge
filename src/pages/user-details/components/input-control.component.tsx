import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

type Props<T extends Record<string, string>> = {
  error: string;
  id: keyof T;
  isInvalid: boolean;
  label: string;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const InputControl = <T extends Record<string, string>>({
  error,
  id,
  label,
  onBlur,
  onChange,
  isInvalid,
  value,
}: Props<T>) => {
  return (
    <FormControl isInvalid={isInvalid} mb={3}>
      <FormLabel htmlFor={id as string}>{label}</FormLabel>
      <Input id={id as string} onChange={onChange} onBlur={onBlur} value={value} />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
