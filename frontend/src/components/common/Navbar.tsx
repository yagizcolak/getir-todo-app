// src/components/Navbar.tsx

import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const NavbarTitle = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 'bold',
}));

const Navbar: React.FC = () => {
  return (
    <StyledAppBar>
      <Container maxWidth={false}>
        <StyledToolbar disableGutters>
          <NavbarTitle variant="h6">
            To-Do APP
          </NavbarTitle>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Navbar;