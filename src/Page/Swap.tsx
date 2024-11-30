import { useState } from 'react';
import { useSignals } from '@preact/signals-react/runtime';
import React from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Switch,
  Button,
  IconButton,
  Stack,
} from '@mui/material';
import { ArrowDownCircle } from 'lucide-react';
import { SwapProps } from '../Utils/interface';
import { TokenSelector } from '../Components/TokenSelector';

const Swap: React.FC = () => {
  useSignals();

  // State to handle values in the input fields
  const [fromSwap, setFromSwap] = useState<SwapProps>({
    token: 'ETH',
    value: 4.00,
    price: 1.00,
  })

  const [toSwap, setToSwap] = useState<SwapProps>({
    token: 'WLD',
    value: 2.00,
    price: 0.30,
  })

  // Function to swap the values between the two fields
  const handleSwap = () => {
    setFromSwap(toSwap);
    setToSwap(fromSwap);
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#121212',
      }}
    >
      <Card
        sx={{
          maxWidth: '35%',
          width: '100%',
          backgroundColor: 'rgba(18, 18, 18, 0.9)',
          backdropFilter: 'blur(10px)',
          color: 'white',
          borderRadius: '24px',
          border: '1px solid rgba(0, 188, 212, 0.1)',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Swap</Typography>
          </Box>

          {/* From Token */}
          <Box sx={{ mb: 1, backgroundColor: 'rgba(0, 0, 0, 0.2)', p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <TextField
                variant="standard"
                placeholder="0.00"
                value={fromSwap.value}
                onChange={(e) => {
                  setFromSwap({
                    ...fromSwap,
                    value: parseFloat(e.target.value),
                  });
                }}
                type="number"
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: '24px', color: 'white' },
                }}
                inputProps={{
                  min: '0', // Prevent negative numbers
                  step: 'any', // Allow decimal values
                }}
                sx={{ width: '60%' }}
              />
              <TokenSelector token={fromSwap.token} setToken={(token) => setFromSwap({ ...fromSwap, token })} />
            </Box>
            <Typography variant="body2" sx={{ color: 'gray' }}>~${fromSwap.price}</Typography>
          </Box>

          {/* Swap Direction Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <IconButton
              sx={{ color: '#00BCD4', backgroundColor: 'rgba(0, 188, 212, 0.1)' }}
              onClick={handleSwap} // Handle swap on click
            >
              <ArrowDownCircle size={20} />
            </IconButton>
          </Box>

          {/* To Token */}
          <Box sx={{ mb: 3, backgroundColor: 'rgba(0, 0, 0, 0.2)', p: 2, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <TextField
                variant="standard"
                placeholder="0.00"
                value={toSwap.value}
                onChange={(e) => {
                  setToSwap({
                    ...toSwap,
                    value: parseFloat(e.target.value),
                  });
                }}
                type="number"
                InputProps={{
                  disableUnderline: true,
                  style: { fontSize: '24px', color: 'white' },
                }}
                inputProps={{
                  min: '0', // Prevent negative numbers
                  step: 'any', // Allow decimal values
                }}
                sx={{ width: '60%' }}
              />
              <TokenSelector token={toSwap.token} setToken={(token) => setToSwap({ ...toSwap, token })} />
            </Box>
            <Typography variant="body2" sx={{ color: 'gray' }}>~${toSwap.price}</Typography>
          </Box>

          {/* Recipient Address */}
          <Typography variant="body1" sx={{ mb: 1 }}>Recipient Address</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter address"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(0, 188, 212, 0.2)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(0, 188, 212, 0.3)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00BCD4',
                },
              },
            }}
          />

          {/* Gas TopUp Switch */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            p: 2,
            borderRadius: 2,
            mb: 3
          }}>
            <Box>
              <Typography variant="body1">Enable Gas TopUp</Typography>
              <Typography variant="body2" sx={{ color: 'gray' }}>
                Get Native Tokens for transactions
              </Typography>
            </Box>
            <Switch />
          </Box>

          {/* Connect Wallet Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              py: 1.5,
              fontSize: '16px',
            }}
          >
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default Swap;
