import useResponsive from "@/hooks/useResponsive";
import { Box } from "@mui/material";
import NavVertical from "./nav/NavVertical";
import Main from "./Main";
import Header from "./header";
import { useState } from "react";
import { useSettingsContext } from "@/components/settings";

type Props = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { themeLayout } = useSettingsContext();
  const isDesktop = useResponsive("up", "lg");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header onOpenNav={handleOpen} />
      <Box sx={{ display: { lg: "flex" }, minHeight: { lg: 1 } }}>
        <NavVertical openNav={open} onCloseNav={handleClose} />
        <Main>{children}</Main>
      </Box>
    </>
  );
}
