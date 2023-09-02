import { useState } from "react";
import * as Yup from "yup";
// form
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// auth
import { useAuthContext } from "@/auth/useAuthContext";
// components
import Iconify from "@/components/iconify";
import FormProvider, { RHFTextField } from "@/components/hook-form";

// ----------------------------------------------------------------------

type FormValuesProps = {
  mobile: string;
  password: string;
  code: string;
  afterSubmit?: string;
};

export default function AuthRegisterForm() {
  const { register } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    mobile: Yup.string().required("Mobile required"),
    password: Yup.string().required("Password is required"),
    code: Yup.string().required("Code is required"),
  });

  const defaultValues = {
    mobile: "",
    password: "",
    code: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    console.log("reg");
    try {
      if (register) {
        await register(data.mobile, data.password, data.code);
      }
    } catch (error: any) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message || error,
      });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="mobile" label="Mobile" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <RHFTextField name="code" label="Verification Code" />
          <Button variant="outlined">Send Code</Button>
        </Stack>

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting || isSubmitSuccessful}
          sx={{
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
            "&:hover": {
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
            },
          }}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
