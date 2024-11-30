import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Activity } from 'lucide-react';
import ConnectButton from '../Components/ConnectButton';

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 4, flexGrow: 1 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        My Dashboard
      </Typography>

      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          backgroundColor: 'background.paper',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: 600,
          mx: 'auto',
          mt: 4
        }}
      >
        <Activity size={48} color="#009688" />
        <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
          Oops! Your wallet doesn't seem to be connected
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Connect now to continue your AYJ journey
        </Typography>
        <ConnectButton sx={{
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: 8,
          px: 4,
          py: 2
        }}/>
      </Paper>
    </Box>
  );
};

export default Dashboard;