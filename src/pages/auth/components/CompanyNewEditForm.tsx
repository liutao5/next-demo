import * as Yup from "yup";
import { ICompany } from "@/@types/company";
import FormProvider from "@/components/hook-form/FormProvider";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RHFTextField, RHFUploadAvatar } from "@/components/hook-form";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { fData } from "@/utils/formatNumber";
import { companyNew, uploadImg } from "@/api/auth";
import { setCompany } from "@/auth/utils";
import { useRouter } from "next/router";
import { PATH_DASHBOARD } from "@/routes/path";
import Iconify from "@/components/iconify";
import { IRefProps } from "../createCompany";
import React from "react";
import { useAuthContext } from "@/auth/useAuthContext";

interface FormValuesProps {
  full_name: string;
  short_name: string;
  logo?: string;
  warehouse?: string;
  financle?: Financle[];
  invoice: Invoice;
}

interface Invoice {
  is_vat_invoice_special: boolean;
  title: string;
  duty_paragraph: string;
  address?: string;
  phone_number?: string;
  deposit_bank?: string;
  bank_account?: string;
}

interface Financle {
  finance_account_type?: number;
  account_name: string;
  account_id: string;
  bank_name: string;
}
const CompanyNewEditForm = forwardRef(function CompanyNewEditForm(
  _: any,
  companyRef: any
) {
  const { saveCompany } = useAuthContext();
  const [bankList, setBankList] = useState<number[]>([0]);
  const CompanySchema = Yup.object().shape({
    full_name: Yup.string().required("请输入公司名称"),
    short_name: Yup.string().required("请输出公司简称"),
    logo: Yup.string(),
    warehouse: Yup.string(),
    financle: Yup.array().of(
      Yup.object().shape({
        finance_account_type: Yup.number(),
        account_id: Yup.string().required("请输出账号"),
        account_name: Yup.string().required("请输入账号名称"),
        bank_name: Yup.string().required("请输出开户行"),
      })
    ),
    invoice: Yup.object().shape({
      is_vat_invoice_special: Yup.boolean().required(),
      title: Yup.string().required("请输入发票抬头"),
      duty_paragraph: Yup.string().required("请输入税号"),
      address: Yup.string(),
      phone_number: Yup.string(),
      deposit_bank: Yup.string(),
      bank_account: Yup.string(),
    }),
  });

  const defaultValues = {
    full_name: "",
    short_name: "",
    logo: "",
    warehouse: "",
    invoice: {
      is_vat_invoice_special: true,
      title: "",
      duty_paragraph: "",
      address: "",
      phone_number: "",
      deposit_bank: "",
      bank_account: "",
    },
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CompanySchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      console.log("file", file);

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      const res = await uploadImg(newFile);
      const { file_path } = res;
      if (file_path) {
        setValue("logo", file_path);
      }
    },
    [setValue]
  );

  const onSubmit = async (data: FormValuesProps) => {
    const { financle } = data;
    const reqData = {
      ...data,
      financle: financle?.map((item) => ({ ...item, finance_account_type: 1 })),
    };
    console.log(reqData);
    const res = await companyNew(reqData);
    if (res.error_code) {
      console.log(res.user_tip);
    }
    if (res.id) {
      saveCompany(res.id);
    }
  };

  useImperativeHandle(companyRef, () => {
    return {
      save: handleSubmit(onSubmit),
    };
  });

  return (
    <FormProvider methods={methods}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: "auto",
                      display: "block",
                      textAlign: "center",
                      color: "text.secondary",
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="基本信息" />
            <Grid container spacing={3}>
              <Grid item md={6}>
                <RHFTextField name="full_name" label="公司名称" required />
              </Grid>
              <Grid item md={6}>
                <RHFTextField name="short_name" label="公司简称" required />
              </Grid>
              <Grid item md={12} sx={{ display: "flex", gap: 4 }}>
                <RHFTextField name="warehouse" label="仓库名称" />
                {/* <Button
                  size="small"
                  startIcon={<Iconify icon="eva:plus-fill" />}
                >
                  增加
                </Button> */}
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ p: 3, mt: 3 }}>
            <CardHeader title="账户信息" />
            <Grid container spacing={3}>
              {bankList.map((bank, index) => (
                <Grid
                  key={`bank${index}`}
                  item
                  md={12}
                  sx={{ display: "flex", gap: 4 }}
                >
                  <RHFTextField
                    name={`financle.${index}.account_name`}
                    label="开户名称"
                    required
                  />
                  <RHFTextField
                    name={`financle.${index}.bank_name`}
                    label="开户行"
                    required
                  />
                  <RHFTextField
                    name={`financle.${index}.account_id`}
                    label="账号"
                    required
                  />
                  {index + 1 === bankList.length ? (
                    <Button
                      size="small"
                      startIcon={<Iconify icon="eva:plus-fill" />}
                      onClick={() => setBankList((pre) => [...pre, 1])}
                    >
                      增加
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Iconify icon="eva:minus-fill" />}
                      onClick={() => {
                        const temp = [...bankList];
                        temp.splice(index, 1);
                        setBankList(temp);
                      }}
                    >
                      删除
                    </Button>
                  )}
                </Grid>
              ))}
            </Grid>
          </Card>

          <Card sx={{ p: 3, mt: 3 }}>
            <CardHeader title="开票信息">test</CardHeader>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <RHFTextField name="invoice.title" label="发票抬头" />
              </Grid>
              <Grid item md={6}>
                <RHFTextField name="invoice.duty_paragraph" label="税号" />
              </Grid>
              <Grid item md={6}>
                <RHFTextField name="invoice.address" label="地址" />
              </Grid>
              <Grid item md={6}>
                <RHFTextField name="invoice.phone_number" label="电话号码" />
              </Grid>
              <Grid item md={6}>
                <RHFTextField name="invoice.deposit_bank" label="开户银行" />
              </Grid>
              <Grid item md={6}>
                <RHFTextField name="invoice.bank_account" label="银行账户" />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
});
export default CompanyNewEditForm;

{
  /* <Card sx={{ p: 3, mt: 3 }}>
  <CardHeader title="账户信息" />
  <Grid container spacing={3}>
    {bankList.map((bank, index) => (
      <Grid
        key={`bank${index}`}
        item
        md={12}
        sx={{ display: "flex", gap: 4 }}
      >
        <RHFTextField
          name={`financle.0.finance_account_type`}
          value={1}
          sx={{
            width: 0,
          }}
          required
        />
        <RHFTextField
          name={`financle.0.account_name`}
          label="开户名称"
          required
        />
        <RHFTextField
          name={`financle.0.bank_name`}
          label="开户行"
          required
        />
        <RHFTextField
          name={`financle.0.account_id`}
          label="账号"
          required
        />
        {index + 1 === bankList.length ? (
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            // onClick={() =>
            //   setBankList((pre) => [
            //     ...pre,
            //     {
            //       finance_account_type: 1,
            //       account_id: "",
            //       account_name: "",
            //     },
            //   ])
            // }
          >
            增加
          </Button>
        ) : (
          <Button
            size="small"
            color="error"
            startIcon={<Iconify icon="eva:minus-fill" />}
            onClick={() => {
              const temp = [...bankList];
              temp.splice(index, 1);
              setBankList(temp);
            }}
          >
            删除
          </Button>
        )}
      </Grid>
    ))}

    <Divider />
    {wxList.map((wx, index) => (
      <Grid
        key={`wx${index}`}
        item
        md={12}
        sx={{ display: "flex", gap: 4 }}
      >
        <RHFTextField
          name={`financle.1.account_name`}
          label="微信名称"
          required
        />
        <RHFTextField
          name={`financle.1.account_id`}
          label="微信号"
          required
        />
        {index + 1 === wxList.length ? (
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            // onClick={() =>
            //   setWxList((pre) => [
            //     ...pre,
            //     {
            //       finance_account_type: 3,
            //       account_id: "",
            //       account_name: "",
            //     },
            //   ])
            // }
          >
            增加
          </Button>
        ) : (
          <Button
            color="error"
            size="small"
            startIcon={<Iconify icon="eva:minus-fill" />}
            onClick={() => {
              const temp = [...wxList];
              temp.splice(index, 1);
              setWxList(temp);
            }}
          >
            删除
          </Button>
        )}
      </Grid>
    ))}

    <Divider />
    {alipayList.map((alipay, index) => (
      <Grid
        key={`alipay${index}`}
        item
        md={12}
        sx={{ display: "flex", gap: 4 }}
      >
        <RHFTextField
          name={`financle.2.account_name`}
          label="支付宝名称"
          required
        />
        <RHFTextField
          name={`financle.2.account_id`}
          label="支付宝账号"
          required
        />
        {index + 1 === alipayList.length ? (
          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            // onClick={() =>
            //   setAlipayList((pre) => [
            //     ...pre,
            //     {
            //       finance_account_type: 2,
            //       account_id: "",
            //       account_name: "",
            //     },
            //   ])
            // }
          >
            增加
          </Button>
        ) : (
          <Button
            color="error"
            size="small"
            startIcon={<Iconify icon="eva:minus-fill" />}
            onClick={() => {
              const temp = [...alipayList];
              temp.splice(index, 1);
              setAlipayList(temp);
            }}
          >
            删除
          </Button>
        )}
      </Grid>
    ))}
  </Grid>
</Card> */
}
