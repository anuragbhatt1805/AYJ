import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { ArrowLeft, ArrowRight, HandCoins, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { ConnectButton } from "../Components/ConnectButton";
import { useSignals } from "@preact/signals-react/runtime";
import { accountToken } from "../Utils/baseStore";
import { useForm, Controller } from "react-hook-form";
import { Stake as Squery, Cover as Cquery, Claim } from "../APIs/Stake";

const Stake = () => {
  useSignals();

  const [sliderValues, setSliderValues] = useState<[number, number, number]>([
    33, 33, 33,
  ]);
  const [coverValue, setCoverValue] = useState<number | null>();
  const [hashValue, setHashValue] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitCover, setSubmitCover] = useState<boolean>(false);
  const [page, setPage] = useState<0 | 1>(0);

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      decimalValue: 0,
      termsAccepted: false,
    },
  });

  useEffect(() => {
    // Ensure sliders always sum to 100
    const total = sliderValues[0] + sliderValues[1] + sliderValues[2] + 1;
    if (total !== 100) {
      const factor = 99 / (sliderValues[0] + sliderValues[1] + sliderValues[2]);
      setSliderValues([
        Math.round(sliderValues[0] * factor),
        Math.round(sliderValues[1] * factor),
        Math.round(sliderValues[2] * factor),
      ]);
    }
  }, [sliderValues]);

  const handlePageChange = () => {
    setPage(page === 0 ? 1 : 0);
  };

  const handleSliderChange =
    (index: number) => (_: Event, newValue: number | number[]) => {
      const newSliderValues = [...sliderValues] as [number, number, number];
      newSliderValues[index] = newValue as number;
      if (index === 0) {
        const remaining = Math.max(0, 100 - newSliderValues[0]);
        newSliderValues[1] = Math.round(remaining / 2);
        newSliderValues[2] = remaining - newSliderValues[1];
      } else if (index === 1) {
        newSliderValues[2] = Math.max(
          0,
          100 - newSliderValues[0] - newSliderValues[1]
        );
      } else if (index === 2) {
        newSliderValues[1] = Math.max(
          0,
          100 - newSliderValues[0] - newSliderValues[2]
        );
      }
      setSliderValues(newSliderValues);
    };
  const handleInputChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Math.min(100, Math.max(0, Number(event.target.value)));
      const newSliderValues = [...sliderValues] as [number, number, number];
      newSliderValues[index] = newValue;
      newSliderValues[1 - index] = 100 - newValue;
      setSliderValues(newSliderValues);
    };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(event.target.checked);
    setValue("termsAccepted", event.target.checked);
  };

  const onStake = (data: any) => {
    if (accountToken.value && data.termsAccepted) {
      Squery(data.decimalValue, sliderValues, accountToken.value);
    }
    setSubmitSuccess(true);
    handlePageChange();
  };

  const onCover = () => {
    if (coverValue && !isNaN(coverValue)) {
      Cquery(coverValue);
      setSubmitCover(true);
    }
  };

  const onClaim = () => {
    if (hashValue && hashValue.length > 0) {
      Claim(hashValue);
    }
    alert("Your request for Claim has been submitted successfully");
  }

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: "#121212",
      }}
    >
      {page === 0 && (
        <Card
          sx={{
            maxWidth: "35%",
            width: "100%",
            minHeight: "75%",
            backgroundColor: "rgba(18, 18, 18, 0.9)",
            backdropFilter: "blur(10px)",
            color: "white",
            borderRadius: "24px",
            border: "1px solid rgba(0, 188, 212, 0.1)",
            // animation: `${page === 0 ? "" : "fadeOutOpacity 2s ease-in"}`,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
              gap={2}
            >
              <Stack
                direction={"row"}
                gap={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <HandCoins size={30} />
                <Typography variant="h4">Stake</Typography>
              </Stack>

              <Stack
                direction={"row"}
                gap={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  mr: 2,
                }}
              >
                {submitSuccess && (
                  <IconButton
                    onClick={handlePageChange}
                    sx={{
                      borderRadius: "10px",
                      borderWidth: "0px",
                    }}
                  >
                    <ArrowRight size={30} />
                  </IconButton>
                )}
              </Stack>
            </Box>

            <Box component="form" onSubmit={handleSubmit(onStake)}>
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
                      startAdornment: (
                        <Typography mr={2} variant="h6">
                          $
                        </Typography>
                      ),
                      sx: {
                        color: "text.primary",
                        borderColor: "primary.main",
                      },
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
                {[0, 1, 2].map((index) => (
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
                  Stake
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
      )}

      {page === 1 && (
        <Card
          sx={{
            maxWidth: "35%",
            width: "100%",
            // minHeight: "75%",
            backgroundColor: "rgba(18, 18, 18, 0.9)",
            backdropFilter: "blur(10px)",
            color: "white",
            borderRadius: "24px",
            border: "1px solid rgba(0, 188, 212, 0.1)",
            // animation: `${page === 1 ? "" : "fadeOutOpacity 2s ease-in"}`,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4,
              }}
              gap={2}
            >
              <Stack
                direction={"row"}
                gap={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                }}
              >
                <ShieldCheck size={30} />
                <Typography variant="h4">Cover</Typography>
              </Stack>

              <Stack
                direction={"row"}
                gap={2}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "fit-content",
                  mr: 2,
                }}
              >
                {submitSuccess && (
                  <IconButton
                    onClick={handlePageChange}
                    sx={{
                      borderRadius: "10px",
                      borderWidth: "0px",
                    }}
                  >
                    <ArrowLeft size={30} />
                  </IconButton>
                )}
              </Stack>
            </Box>

            <Box>
              <TextField
                label="Cover Value"
                type="number"
                disabled={!accountToken.value}
                helperText={
                  !accountToken.value
                    ? "Connect your wallet to stake"
                    : "To Receive 1.5x value of Cover"
                }
                variant="outlined"
                value={coverValue}
                onChange={(e) => setCoverValue(parseFloat(e.target.value))}
                placeholder="Enter Cover Value"
                sx={{ mb: 2, width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <Typography mr={2} variant="h6">
                      $
                    </Typography>
                  ),
                  sx: {
                    color: "text.primary",
                    borderColor: "primary.main",
                  },
                }}
              />

              {coverValue && !isNaN(coverValue) && (
                <Typography variant="body2" sx={{ color: "primary.main", mt:-1, mb:2 }}>
                  You will receive a cover for amount of {coverValue * 1.5}
                </Typography>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    // checked={termsAccepted}
                    // onChange={handleTermsChange}
                    sx={{ color: "primary.main" }}
                    disabled={submitCover}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body2" sx={{ color: "text.primary" }}>
                      I accept that it will take 7 days to complete claim process
                    </Typography>
                  </Box>
                }
                sx={{ mt: 0, ml:1, alignSelf: "flex-start" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ color: "primary.main" }}
                    disabled={submitCover}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    I agree to submit On-Chain-Proof / Hash for claiming the amount
                  </Typography>
                }
                sx={{ mt: -1.2, ml:1, alignSelf: "flex-start" }}
              />
              {accountToken.value ? (
                submitSuccess && (
                  <Button
                    type="submit"
                    variant="contained"
                    onClick={onCover}
                    fullWidth
                    sx={{ mt: 2, py: 0.7, fontSize: "20px" }}
                    disabled={submitCover}
                  >
                    OPT Cover
                  </Button>
                )
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

            <Box
            mt={2}>
            {
              submitCover && (
                <>
                <Typography variant="h6" sx={{ color: "primary.main" }}>
                  <strong>Please Enter Hash or On-Chain-Proof for Claim</strong>
                </Typography>
                <TextField
                label="Hash / On-Chain-Proof"
                // type="number"
                disabled={!accountToken.value}
                variant="outlined"
                value={hashValue}
                onChange={(e) => setHashValue(e.target.value)}
                placeholder="Enter Hash / On-Chain-Proof"
                sx={{ my: 2, width: "100%" }}
                InputProps={{
                  sx: {
                    color: "text.primary",
                    borderColor: "primary.main",
                  },
                }}
              />
              <Button
                type="button"
                variant="contained"
                onClick={onClaim}
                fullWidth
                sx={{ mt: 2, py: 0.7, fontSize: "20px" }}
                // disabled={submitCover}
              >
                Claim Now
              </Button>
                </>
              )
            }
            </Box>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
};

export default Stake;
