// src/components/NoData.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { styled } from '@mui/material/styles';

interface NoDataProps {
  message?: string;
}

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(2),
  flexGrow: 1,
}));

const Icon = styled(InboxIcon)(({ theme }) => ({
  fontSize: 60,
  color: theme.palette.action.active,
}));

const Message = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const NoData: React.FC<NoDataProps> = ({ message = 'No data available' }) => {
  return (
    <Container>
      <Icon />
      <Message variant="h5">{message}</Message>
    </Container>
  );
};

export default NoData;