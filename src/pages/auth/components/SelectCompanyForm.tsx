import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
} from "@/components/hook-form";
import Iconify from "@/components/iconify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Link,
  ListSubheader,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { getCompany, setCompany } from "@/auth/utils";
import { userGet } from "@/api/auth";
import { ICompany } from "@/@types/company";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@/routes/path";
import { useAuthContext } from "@/auth/useAuthContext";

type FormValuesProps = {
  company: string;
};

export default function SelectCompanyForm() {
  const { push } = useRouter();
  const { saveCompany } = useAuthContext();
  const [open, setOpen] = useState(false);
  const [companyList, setCompanyList] = useState<ICompany[]>();

  const currentCompanyId = getCompany();

  useEffect(() => {
    userGet().then((res) => {
      console.log("userinfo", res);
      setCompanyList(res.companies);
    });
  }, []);

  const LoginSchema = Yup.object().shape({
    company: Yup.string().required("请选择公司"),
  });

  const defaultValues = {
    company: currentCompanyId || "",
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = methods;

  const onSubmit = (data: FormValuesProps) => {
    saveCompany(data.company);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h4">欢迎来到无算</Typography>
          <Button variant="text" onClick={() => push("/auth/createCompany")}>
            创建我的公司
          </Button>
          <Button variant="text" onClick={() => setOpen(true)}>
            加入公司
          </Button>
        </Stack>
        {companyList && companyList.length > 0 && (
          <>
            <RHFSelect name="company" label="请选择公司" native={false}>
              <ListSubheader sx={{ color: "text.disabled" }}>
                我的公司
              </ListSubheader>
              {companyList
                .filter((company) => company.is_owner)
                .map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.full_name}
                  </MenuItem>
                ))}
              <ListSubheader sx={{ color: "text.disabled" }}>
                受邀请公司
              </ListSubheader>
              {companyList
                .filter((company) => !company.is_owner)
                .map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.full_name}
                  </MenuItem>
                ))}
            </RHFSelect>
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
                    theme.palette.mode === "light"
                      ? "common.white"
                      : "grey.800",
                },
              }}
            >
              登录
            </LoadingButton>
          </>
        )}
      </Stack>
      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>提示</DialogTitle>
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          联系该公司无算软件管理员，邀请您成为该公司成员。
        </DialogContent>
      </Dialog>
    </FormProvider>
  );
}
