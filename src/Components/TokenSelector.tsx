import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  List,
  Typography,
  ListItemButton,
  ListItemIcon,
  Avatar,
  ListItemText,
  Stack,
} from "@mui/material";
import { ChevronDown } from "lucide-react";
import { TokenSelector as TS } from "../Utils/interface";
import { X } from "lucide-react";
import { useState } from "react";
import { mockChains, mockTokens } from "../Utils/constants";
import { Chain, Token } from "../Utils/interface";

const TokenSelector = ({ token, disabled, setToken }: TS) => {
  const [dialog, setDialog] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<Chain>(mockChains[0]);
  // const [selected]
  const handleChainSelect = (chain: Chain) => {
    setSelectedChain(chain);
  };

  const handleTokenSelect = (token: Token) => {
    setToken(token);
    setDialog(false);
  };

  const handleDialog = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleDialog}
        disabled={disabled}
        sx={{
          backgroundColor: "rgba(0, 188, 212, 0.1)",
          "&:hover": {
            backgroundColor: "rgba(0, 188, 212, 0.2)",
          },
          borderRadius: "20px",
          padding: "8px 16px",
          textTransform: "none",
          color: "#00BCD4",
        }}
        endIcon={<ChevronDown size={20} />}
      >
        <Typography>{token?.symbol || "Select Token"}</Typography>
      </Button>
      <Dialog
        open={dialog}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "#000000",
            maxHeight: "71.4vh",
            width: "50vw",
            margin: "auto",
          },
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6">Select Token</Typography>
          <IconButton edge="end" size="small" onClick={handleClose}>
            <X size={24} />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ height: "70vh" }}>
          <Stack direction="row" spacing={2} sx={{ mb: 2, height: "56vh" }}>
            <Stack sx={{ width: "30%", background: "#1a1a1a" }}>
              <List
                sx={{
                  height: "60vh",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#009688",
                    borderRadius: "2px",
                  },
                }}
              >
                {mockChains?.map((chain) => (
                  <ListItem
                    key={chain.id}
                    disablePadding
                    sx={{
                      backgroundColor:
                        selectedChain.id === chain.id
                          ? "#009688"
                          : "transparent",
                    }}
                  >
                    <ListItemButton onClick={() => handleChainSelect(chain)}>
                      <ListItemIcon>
                        <Avatar src={chain.icon} />
                      </ListItemIcon>
                      <ListItemText primary={chain.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
            <Stack sx={{ width: "70%" }}>
              <List
                sx={{
                  height: "60vh",
                  overflow: "auto",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#009688",
                    borderRadius: "2px",
                  },
                }}
              >
                {mockTokens[selectedChain.id]?.map((token1) => (
                  <ListItem
                    key={token1.address}
                    disablePadding
                    sx={{
                      backgroundColor:
                        token1 === token ? "#009688" : "transparent",
                    }}
                  >
                    <ListItemButton onClick={() => handleTokenSelect(token1)}>
                      <ListItemIcon>
                        <Avatar
                          src={token1.icon}
                          sx={{
                            borderRadius: "8px",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={token1.symbol}
                        secondary={token1.address}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { TokenSelector };
