// src/components/FilterBar.tsx

import React from "react";
import { Box, Grid, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TASK_CATEGORIES, TASK_STATUSES } from "../../constants";
import { styled } from '@mui/material/styles';

// Styled Components
export const StyledGridContainer = styled(Grid)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
}));

export const RoundedTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
  },
}));

interface FilterBarProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategory: string;
  handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedStatus: string;
  handleStatusChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchTerm,
  handleSearchChange,
  selectedCategory,
  handleCategoryChange,
  selectedStatus,
  handleStatusChange,
}) => {
  return (
    <Box>
      <StyledGridContainer container spacing={2}>
        {/* Keyword Search */}
        <Grid item xs={12} sm={6} md={4}>
          <RoundedTextField
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by keyword"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Category Filter */}
        <Grid item xs={6} sm={3} md={2}>
          <RoundedTextField
            select
            label="Category"
            variant="outlined"
            fullWidth
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">
              <em>All Categories</em>
            </MenuItem>
            {TASK_CATEGORIES.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </RoundedTextField>
        </Grid>

        {/* Status Filter */}
        <Grid item xs={6} sm={3} md={2}>
          <RoundedTextField
            select
            label="Status"
            variant="outlined"
            fullWidth
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <MenuItem value="">
              <em>All Statuses</em>
            </MenuItem>
            {TASK_STATUSES.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </MenuItem>
            ))}
          </RoundedTextField>
        </Grid>
      </StyledGridContainer>
    </Box>
  );
};

export default FilterBar;
