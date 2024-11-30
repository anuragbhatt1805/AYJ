import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import {
  Activity,
  ArrowDownUp,
  Bot,
  HandCoins,
  LayoutDashboard,
} from "lucide-react";
import { useSignals } from "@preact/signals-react/runtime";
import { homeTab } from "../Stores/baseStore";
import ConnectButton from "./ConnectButton";

const menuItems: {
  name: string;
  icon: any;
  value: "dashboard" | "swap" | "ai-bot" | "stake";
}[] = [
  { name: "Dashboard", icon: LayoutDashboard, value: "dashboard" },
  { name: "Swap", icon: ArrowDownUp, value: "swap" },
  { name: "Stake", icon: HandCoins, value: "stake" },
  { name: "AI Bot", icon: Bot, value: "ai-bot" },
];

const Header: React.FC = () => {
  useSignals();

  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          py: 1,
          mt: 1,
        }}
      >
        <Box display="flex" alignItems="center" sx={{ color: "primary.main" }}>
          <Activity size={30} />
          <Typography variant="h4" sx={{ ml: 1, fontWeight: "bold" }}>
            AYJ
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            ml: 4,
            background: "rgb(59, 64, 64)",
            px: 2,
            py: 1,
            borderRadius: 3,
          }}
        >
          {menuItems.map((item) => (
            <Button
              color="inherit"
              sx={{
                px: 2,
                border:
                  homeTab.value === item.value ? "2px solid #009688" : "none",
                borderRadius: 3,
                backgroundColor:
                  homeTab.value === item.value ? "#009688" : "transparent",
                boxShadow:
                  homeTab.value === item.value ? "0 0 2px #009688" : "none",
                ":hover": {
                  border: "2px solid #009688",
                },
              }}
              onClick={() => {
                homeTab.value = item.value;
              }}
            >
              <item.icon size={24} />
              <Typography variant="subtitle1" sx={{ ml: 1 }}>
                {item.name}
              </Typography>
            </Button>
          ))}
        </Box>

        <Box>
          <ConnectButton
            variant={"outlined"}
            sx={{
              ":hover": {
                backgroundColor: "#009688",
                color: "white",
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
