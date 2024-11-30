import { Button } from "@mui/material";

interface ConnectButtonProps {
  sx?: object;
  variant?: "contained" | "outlined" | "text";
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ sx = {}, variant }) => {
  return (
    <Button
      variant={variant || "contained"}
      color="primary"
      sx={{ mr: 2, fontWeight: "bold", fontSize: "1rem", ...sx }}
    >
      Connect Wallet
    </Button>
  );
};

export {ConnectButton};
