// src/components/Loader.tsx

import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const LoaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}));

const Loader: React.FC = () => (
  <LoaderContainer>
    <CircularProgress />
  </LoaderContainer>
);

export default Loader;