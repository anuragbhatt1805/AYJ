import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { HandCoins } from "lucide-react";
import { useEffect, useState } from "react";
import { ConnectButton } from "../Components/ConnectButton";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken } from "../Utils/baseStore";
import { useForm, Controller } from "react-hook-form";
import Query from "../APIs/Stake";

const Stake = () => {
  useSignals();

  const [sliderValues, setSliderValues] = useState<[number, number]>([50, 50]);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      decimalValue: 0,
      termsAccepted: false,
    },
  });

  useEffect(() => {
    // Ensure sliders always sum to 100
    const total = sliderValues[0] + sliderValues[1];
    if (total !== 100) {
      setSliderValues([sliderValues[0], 100 - sliderValues[0]]);
    }
  }, [sliderValues]);

  const handleSliderChange =
    (index: number) => (_: Event, newValue: number | number[]) => {
      const newSliderValues = [...sliderValues] as [number, number];
      newSliderValues[index] = newValue as number;
      newSliderValues[1 - index] = 100 - newSliderValues[index];
      setSliderValues(newSliderValues);
    };

  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Math.min(100, Math.max(0, Number(event.target.value)));
      const newSliderValues = [...sliderValues] as [number, number];
      newSliderValues[index] = newValue;
      newSliderValues[1 - index] = 100 - newValue;
      setSliderValues(newSliderValues);
    };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
    setValue("termsAccepted", event.target.checked);
  };

  const onSubmit = (data: any) => {
    if (accountToken.value && data.termsAccepted) {
      Query(data.decimalValue, sliderValues, accountToken.value);
    }
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "94vh",
        backgroundColor: "#121212",
      }}
    >
      <Card
        sx={{
          maxWidth: "35%",
          width: "100%",
          backgroundColor: "rgba(18, 18, 18, 0.9)",
          backdropFilter: "blur(10px)",
          color: "white",
          borderRadius: "24px",
          border: "1px solid rgba(0, 188, 212, 0.1)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              mb: 4,
            }}
            gap={2}
          >
            <HandCoins size={30} />
            <Typography variant="h4">Stake</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="decimalValue"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Stake Value"
                  type="number"
                  disabled={!accountToken.value}
                  helperText={
                    !accountToken.value ? "Connect your wallet to stake" : ""
                  }
                  variant="outlined"
                  placeholder="Enter Stake Value"
                  sx={{ mb: 2, width: "100%" }}
                  InputProps={{
                    sx: { color: "text.primary", borderColor: "primary.main" },
                  }}
                />
              )}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                mb: 2,
              }}
            >
              {[0, 1].map((index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Slider
                    orientation="vertical"
                    value={sliderValues[index]}
                    onChange={handleSliderChange(index)}
                    disabled={!accountToken.value}
                    aria-labelledby={`vertical-slider-${index}`}
                    valueLabelDisplay="auto"
                    sx={{ height: 200, color: "primary.main" }}
                  />
                  <TextField
                    type="number"
                    value={sliderValues[index]}
                    onChange={handleInputChange(index)}
                    disabled={!accountToken.value}
                    variant="outlined"
                    sx={{ mt: 2, width: "80px" }}
                    InputProps={{
                      endAdornment: <Typography>%</Typography>,
                      sx: {
                        color: "text.primary",
                        borderColor: "primary.main",
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={termsAccepted}
                  onChange={handleTermsChange}
                  sx={{ color: "primary.main" }}
                  disabled={!accountToken.value}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: "text.primary" }}>
                  I accept the risk, terms, and conditions
                </Typography>
              }
              sx={{ mt: 2, alignSelf: "flex-start" }}
            />
            {accountToken.value ? (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, py: 0.7, fontSize: "20px" }}
                disabled={!termsAccepted}
              >
                Submit
              </Button>
            ) : (
              <ConnectButton
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: "16px",
                  width: "100%",
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Stake;
