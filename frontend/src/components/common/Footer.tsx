// src/components/Footer.tsx

import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#0A2D51',
  padding: theme.spacing(2),
  marginTop: 'auto',
}));

const FooterText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  textAlign: 'right',
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <Container maxWidth={false}>
        <FooterText variant="body2">
          © {new Date().getFullYear()} To-Do APP. All rights reserved.
        </FooterText>
      </Container>
    </FooterContainer>
  );
};

export default Footer;