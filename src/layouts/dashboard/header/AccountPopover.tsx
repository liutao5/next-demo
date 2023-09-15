import { useState } from "react";
// next
import { useRouter } from "next/router";
// @mui
import { alpha } from "@mui/material/styles";
import { Box, Divider, Typography, Stack, MenuItem } from "@mui/material";
// routes
import { PATH_AUTH, PATH_DASHBOARD } from "@/routes/path";
// auth
// import { useAuthContext } from "@/auth/useAuthContext";
// components
// import { CustomAvatar } from "@/components/custom-avatar";
// import { useSnackbar } from "@/components/snackbar";
import MenuPopover from "@/components/menu-popover";
import { IconButtonAnimate } from "@/components/animate";
import { useAuthContext } from "@/auth/useAuthContext";
import { useSnackbar } from "@/components/snackbar";
import { CustomAvatar } from "@/components/custom-avatar";
import { getCompany, setCompany } from "@/auth/utils";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: "/",
  },
  {
    label: "Settings",
    linkTo: PATH_DASHBOARD.root,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { replace, push } = useRouter();

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const companyId = getCompany();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      replace(PATH_AUTH.login);
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (companyId: string) => {
    handleClosePopover();
    setCompany(companyId);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpenPopover}
        sx={{
          p: 0,
          ...(openPopover && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              // borderRadius: "50%",
              position: "absolute",
              // bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <CustomAvatar src={""} alt={user?.nick_name} name={user?.nick_name} />
        {user?.companies.find((company) => company.id === companyId)?.full_name}
      </IconButtonAnimate>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.nick_name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.nick_name}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {user?.companies.map((company) => (
            <MenuItem
              key={company.id}
              onClick={() => handleClickItem(company.id)}
            >
              {company.full_name}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
