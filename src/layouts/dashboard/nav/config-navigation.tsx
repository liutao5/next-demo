import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";
import { PATH_DASHBOARD } from "@/routes/path";

const navConfig = [
  {
    subheader: "general",
    items: [
      {
        title: "menu_home",
        path: "/home",
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "menu_contract",
        path: "/contract",
        icon: <InsertCommentOutlinedIcon />,
      },
      {
        title: "menu_receipts",
        path: "/receipts",
        icon: <LocalLibraryOutlinedIcon />,
      },
      {
        title: "menu_reconcile",
        path: "/reconcile",
        icon: <ForwardToInboxOutlinedIcon />,
      },
      // {
      //   title: "menu_setting",
      //   path: "/setting",
      //   icon: <ForwardToInboxOutlinedIcon />,
      //   children: [{ title: "company", path: PATH_DASHBOARD.setting.company }],
      // },
      {
        title: "menu_company",
        path: "/company",
        icon: <ForwardToInboxOutlinedIcon />,
      },
    ],
  },
];

export default navConfig;
