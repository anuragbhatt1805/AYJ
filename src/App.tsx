import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import theme from "./theme";
import { Header } from "./Components/Header";
import Dashboard from "./Page/Dashboard";
import AiBot from "./Page/AiBot";
import { homeTab } from "./Utils/baseStore";
import { useSignals } from "@preact/signals-react/runtime";
import Swap from "./Page/Swap";
import Stake from "./Page/Stake";

function App() {
  useSignals();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minWidth: "100vw",
        }}
      >
        <Header />
        <Box
          sx={{
            background: "linear-gradient(to bottom, #121212, #1E1E1E)",
            flex: 1,
          }}
        >
          {homeTab.value === "dashboard" ? (
            <Dashboard />
          ) : homeTab.value === "swap" ? (
            <Swap />
          ) : homeTab.value === "ai-bot" ? (
            <AiBot />
          ) : (
            <Stake />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
