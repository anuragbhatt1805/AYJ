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

import { Chain, Token } from "../Utils/interface";

const mockChains: Chain[] = [
  {
    id: 1,
    name: "Ethereum",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 2,
    name: "Solana",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 3,
    name: "ZkSync",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 4,
    name: "Arbitrum",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 5,
    name: "Base",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 6,
    name: "Polygon",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 7,
    name: "Avalanche",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 8,
    name: "Fantom",
    icon: "/placeholder.svg?height=24&width=24",
  },
  {
    id: 9,
    name: "Binance Smart Chain",
    icon: "/placeholder.svg?height=24&width=24",
  },
];

const mockTokens: Record<number, Token[]> = {
  1: [
    {
      id: "1",
      name: "USDC Circle",
      symbol: "USDC",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "2",
      name: "USDT",
      symbol: "USDT",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "3",
      name: "Ethereum",
      symbol: "ETH",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "4",
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "5",
      name: "Uniswap",
      symbol: "UNI",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "6",
      name: "Chainlink",
      symbol: "LINK",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "7",
      name: "Aave",
      symbol: "AAVE",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "8",
      name: "Compound",
      symbol: "COMP",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "9",
      name: "Maker",
      symbol: "MKR",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
    {
      id: "10",
      name: "Synthetix",
      symbol: "SNX",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 1,
    },
  ],
  2: [
    {
      id: "4",
      name: "Solana",
      symbol: "SOL",
      icon: "/placeholder.svg?height=32&width=32",
      balance: "0.00",
      chainId: 2,
    },
  ],
};

const TokenSelector = ({ token, disabled, setToken }: TS) => {

  const [dialog, setDialog] = useState<boolean>(false);
  const [selectedChain, setSelectedChain] = useState<Chain>(mockChains[0]);
  // const [selected]
  const handleChainSelect = (chain: Chain) => {
    setSelectedChain(chain);
  };

  const handleTokenSelect = (token: Token) => {
    setToken(token.symbol);
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
        <Typography>{token || "Select Token"}</Typography>
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
                  <ListItem key={chain.id} disablePadding
                  sx={{
                    backgroundColor: selectedChain.id === chain.id ? "#009688" : "transparent",
                  }}>
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
              <List sx={{
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
                }}>
                {mockTokens[selectedChain.id]?.map((token1) => (
                  <ListItem key={token1.id} disablePadding
                  sx={{
                    backgroundColor: token1.symbol === token ? "#009688" : "transparent",
                  }}>
                    <ListItemButton onClick={() => handleTokenSelect(token1)}>
                      <ListItemIcon>
                        <Avatar src={token1.icon} sx={{
                            borderRadius: "8px"
                        }}/>
                      </ListItemIcon>
                      <ListItemText
                        primary={token1.name}
                        secondary={token1.symbol}
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
