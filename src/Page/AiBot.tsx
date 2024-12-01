import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import { Bot, Send } from 'lucide-react';
import { useSignals } from '@preact/signals-react/runtime';
import { accountToken } from '../Utils/baseStore';
import { ConnectButton } from '../Components/ConnectButton';

const AiBot: React.FC = () => {
  useSignals();

  const [userQuery, setUserQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the submission of the query here
    console.log('Submitted query:', userQuery);
    // Reset the input field
    setUserQuery('');
  };

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "88vh",
        backgroundColor: "#121212",
      }}
    >
      <Card
        sx={{
          maxWidth: "50%",
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
            <Bot size={30} />
            <Typography variant="h4">AI Bot</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              disabled = {!accountToken.value}
              helperText = {!accountToken.value ? 'Connect your wallet to chat' : ''}
              placeholder="Type your message here..."
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              sx={{
                mb: 4,
                fontSize: "20px",
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  '& fieldset': {
                    borderColor: 'rgba(0, 188, 212, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(0, 188, 212, 0.7)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(0, 188, 212, 1)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
              }}
            />
            {
              accountToken.value ? (
                <Button
              type="submit"
              variant="contained"
              disabled = {!accountToken.value}
              endIcon={<Send size={18} />}
              sx={{
                width: '100%',
                backgroundColor: '#009998',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#007f7b',
                },
                py:0.5, fontSize: "16px"
              }}
            >
              Execute
            </Button>
              ) : (
                <ConnectButton
            variant='contained'
            sx={{
              py: 1.5,
              fontSize: '16px',
              width: '100%',
            }}/>
              )
            }


          </Box>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default AiBot;
