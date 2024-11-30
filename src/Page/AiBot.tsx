import React from 'react';
import { Box, Paper } from '@mui/material';

const AiBot: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '88vh',
        // padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '60%', // Iframe width at 60% of the container
          height: '100%', // Full viewport height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          borderRadius: '10px', // Smooth corners for the iframe container
        }}
      >
        <iframe
          src="http://106.51.141.125:808"
          width="100%"
          height="100%"
          title="AI Bot Interface"
          style={{ border: 'none', borderRadius: '8px', padding: '5px'}}
        />
      </Paper>
    </Box>
  );
};

export default AiBot;
