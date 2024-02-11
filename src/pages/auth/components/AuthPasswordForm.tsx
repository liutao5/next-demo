import { useState } from "react";
import * as Yup from "yup";
import FormProvider from "@/components/hook-form/FormProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { RHFTextField } from "@/components/hook-form";
import Iconify from "@/components/iconify";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuthContext } from "@/auth/useAuthContext";
import { login, register } from "@/api/auth";
import { setSession } from "@/auth/utils";
import { LoginStatus } from "../login";

type Props = {
  mobile: string;
  back: VoidFunction;
  changeStatus: (status: LoginStatus) => void;
};

type FormValuesProps = {
  password: string;
  afterSubmit?: string;
};

export default function AuthPasswordForm(props: Props) {
  const { mobile, back, changeStatus } = props;
  const { saveCompany, saveSession } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);

  const passwordSchema = Yup.object().shape({
    password: Yup.string().required(),
  });

  const defaultValues = {
    password: "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(passwordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    const res = await login(mobile, data.password);
    console.log("login res", res);
    if (res.error_code) {
      reset();
      setError("afterSubmit", {
        ...res,
        message: res.user_tip,
      });
      return;
    }
    saveSession(res.token);
    saveCompany('company')
    // changeStatus("company");
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon sx={{ cursor: "pointer" }} onClick={back} />
          输入密码
        </Typography>
        <RHFTextField
          name="password"
          label="输入密码"
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
        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitSuccessful || isSubmitting}
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
          确定
        </LoadingButton>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}
      </Stack>
    </FormProvider>
  );
}
