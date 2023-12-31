import { useRef } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// @mui
import { Box, Stack, TextField, TextFieldProps } from "@mui/material";
import useEventListener from "@/hooks/useEventListener";
// hooks
// import useEventListener from '../../hooks/useEventListener';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  keyName: string;
  inputs: string[];
  onEndInput: VoidFunction;
};

export default function RHFCodes({
  keyName = "",
  inputs = [],
  onEndInput,
  ...other
}: Props) {
  const codesRef = useRef<HTMLDivElement>(null);

  const { control, setValue } = useFormContext();

  const handlePaste = (event: any) => {
    let data = event.clipboardData.getData("text");

    data = data.split("");

    inputs.map((input, index) => setValue(input, data[index]));

    event.preventDefault();
  };

  const handleChangeWithNextField = (
    event: React.ChangeEvent<HTMLInputElement>,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    const { maxLength, value, name } = event.target;

    const fieldIndex = name.replace(keyName, "");

    const fieldIntIndex = Number(fieldIndex);

    const nextfield: HTMLElement | null = document.querySelector(
      `input[name=${keyName}${fieldIntIndex + 1}]`
    );

    if (value.length > maxLength) {
      event.target.value = value[0];
    }

    if (value.length >= maxLength && fieldIntIndex < 4 && nextfield !== null) {
      (nextfield as HTMLElement).focus();
    }

    handleChange(event);

    if (fieldIntIndex === inputs.length) {
      onEndInput();
      // inputs.forEach((input, index) => setValue(input, ""));
      // const firstfield: HTMLElement | null = document.querySelector(
      //   `input[name=${keyName}1]`
      // );
      // firstfield?.focus();
    }
  };

  const handleDelete = (event: any) => {
    const { value, name } = event.target;
    if (event.code === "Backspace") {
      console.log("delete");
      const fieldIndex = name.replace(keyName, "");

      const fieldIntIndex = Number(fieldIndex);

      const lastfield: HTMLElement | null = document.querySelector(
        `input[name=${keyName}${fieldIntIndex - 1}]`
      );

      if (lastfield !== null) {
        setTimeout(() => (lastfield as HTMLElement).focus(), 0);
      }
    }
  };

  useEventListener("paste", handlePaste, codesRef);

  useEventListener("keydown", handleDelete, codesRef);

  return (
    <Stack direction="row" spacing={2} justifyContent="center" ref={codesRef}>
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  width: { xs: 32, sm: 46 },
                  height: { xs: 36, sm: 56 },
                  "& input": { p: 0, textAlign: "center" },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "number",
              }}
              {...other}
            />
          )}
        />
      ))}
    </Stack>
  );
}
