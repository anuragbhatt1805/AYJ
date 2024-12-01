import { Button } from "@mui/material";
import { ethers } from "ethers";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken } from "../Utils/baseStore";

interface ConnectButtonProps {
  sx?: object;
  variant?: "contained" | "outlined" | "text";
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ sx = {}, variant }) => {
  useSignals();


  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request account access
        const [selectedAccount] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountToken.value = selectedAccount;

        // Optionally, you can initialize the provider here
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("Signer address:", await signer.getAddress());
      } catch (err) {
        console.error("Failed to connect wallet:", err);
      }
    } else {
      console.log("MetaMask is not installed");
    }
  };

  return (
    <Button
      variant={variant || "contained"}
      color="primary"
      sx={{ mr: 2, fontWeight: "bold", fontSize: "1rem", ...sx }}
      onClick={connectWallet}
    >
      {accountToken.value ? `Connected: ${accountToken.value?.slice(0, 6)}...${accountToken.value?.slice(-4)}` : "Connect Wallet"}
    </Button>
  );
};

export { ConnectButton };
