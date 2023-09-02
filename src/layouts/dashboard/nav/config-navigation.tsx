import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ForwardToInboxOutlinedIcon from "@mui/icons-material/ForwardToInboxOutlined";

const navConfig = [
  {
    subheader: "general",
    items: [
      {
        title: "home",
        path: "/home",
        icon: <HomeOutlinedIcon />,
      },
      {
        title: "contract",
        path: "/contract",
        icon: <InsertCommentOutlinedIcon />,
      },
      {
        title: "receipts",
        path: "/receipts",
        icon: <LocalLibraryOutlinedIcon />,
      },
      {
        title: "reconcile",
        path: "/reconcile",
        icon: <ForwardToInboxOutlinedIcon />,
      },
    ],
  },
];

export default navConfig;
