import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Checklist as ChecklistIcon,
  Build as BuildIcon,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router";

interface Props {
  children: React.ReactNode;
}

const drawerWidth = 240;

export default function DefaultLayout({ children }: Props) {
  const drawerItems = [
    { text: "TODO", to: "/todo", icon: <ChecklistIcon /> },
    { text: "フォームビルダー", to: "/form-builder", icon: <BuildIcon /> },
  ];

  const drawer = (
    <div>
      <Toolbar variant="dense" />
      <Divider />
      <List>
        {drawerItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.to}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap component="div">
            React Demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar variant="dense" />
        {children}
      </Box>
    </Box>
  );
}
