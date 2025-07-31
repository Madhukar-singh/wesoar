import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Paper,
} from "@mui/material";
import {
  Search,
  X, // For clear button in TextField
  RotateCcw, // For refresh/reset icon
  Filter, // For the filter icon
  ListFilter, // For the sort icon
  Printer,
  Share2,
} from "lucide-react"; // Using lucide-react for icons

export default function App() {
  const [title, setTitle] = useState("");
  const [bankingSector, setBankingSector] = useState("");
  const [operations, setOperations] = useState("");

  const handleClearTitle = () => {
    setTitle("");
  };

  const handleApplyFilters = () => {
    // Logic to apply filters
    console.log("Applying filters:", { title, bankingSector, operations });
  };

  const handleResetFilters = () => {
    setTitle("");
    setBankingSector("");
    setOperations("");
    console.log("Resetting filters");
  };

  return (
    <Box className="flex flex-col items-center p-4 rounded-full">
      {/* Filter and Search Bar Section */}
      {/* Removed elevation and added border to match the image */}
      <Paper className="w-full max-w-7xl p-4 rounded-lg flex flex-wrap items-center justify-center gap-4 mb-6 border border-gray-300">
        {/* Title Search Field */}
        <Box className="relative flex items-center flex-grow max-w-xs">
          <Search size={20} className="absolute left-3 text-gray-500" />
          <TextField
            variant="outlined"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-full bg-gray-50 pl-10 pr-2 py-1"
            InputProps={{
              disableUnderline: true,
              style: {
                borderRadius: "9999px",
                paddingLeft: "2.5rem",
                paddingRight: "0.5rem",
              }, // Custom padding for icon
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&:hover fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "transparent" },
                backgroundColor: "#f9fafb", // bg-gray-50
                borderRadius: "9999px", // rounded-full
              },
            }}
          />
          {title && (
            <IconButton
              size="small"
              onClick={handleClearTitle}
              className="absolute right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </IconButton>
          )}
        </Box>

        {/* Banking Sector Dropdown */}
        <FormControl variant="outlined" className="flex-grow max-w-xs">
          <Select
            value={bankingSector}
            onChange={(e) => setBankingSector(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="w-full rounded-full bg-gray-50"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              backgroundColor: "#f9fafb", // bg-gray-50
              borderRadius: "9999px", // rounded-full
            }}
          >
            <MenuItem value="" disabled>
              Banking Sector
            </MenuItem>
            <MenuItem value="retail">Retail Banking</MenuItem>
            <MenuItem value="corporate">Corporate Banking</MenuItem>
            <MenuItem value="investment">Investment Banking</MenuItem>
          </Select>
        </FormControl>

        {/* Operations Dropdown */}
        <FormControl variant="outlined" className="flex-grow max-w-xs">
          <Select
            value={operations}
            onChange={(e) => setOperations(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="w-full rounded-full bg-gray-50"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              backgroundColor: "#f9fafb", // bg-gray-50
              borderRadius: "9999px", // rounded-full
            }}
          >
            <MenuItem value="" disabled>
              Operations
            </MenuItem>
            <MenuItem value="front">Front Office</MenuItem>
            <MenuItem value="middle">Middle Office</MenuItem>
            <MenuItem value="back">Back Office</MenuItem>
          </Select>
        </FormControl>

        {/* Reset Button */}
        <IconButton
          onClick={handleResetFilters}
          className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full p-3"
        >
          <RotateCcw size={20} />
        </IconButton>

        {/* Apply Filters Button */}
        <Button
          variant="contained"
          onClick={handleApplyFilters}
          className="bg-blue-600 hover:bg-blue-700 normal-case rounded-full px-6 py-3 text-white font-semibold shadow-md"
        >
          Apply Filters (6)
        </Button>

        {/* Filter Icon Button */}
        <IconButton className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-md">
          <Filter size={20} />
        </IconButton>

        {/* Sort Icon Button */}
        <IconButton className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-3 shadow-md">
          <ListFilter size={20} />
        </IconButton>
      </Paper>

      {/* Results and Action Buttons Section */}
      <Box className="w-full max-w-7xl flex justify-between items-center px-4">
        <Typography variant="body1" className="text-gray-700 font-medium">
          <span className="font-bold">3,145,684</span> results find for
          &quot;Banking Sector&quot;
        </Typography>
        <Box className="flex space-x-4">
          <IconButton className="text-gray-600 hover:text-blue-600">
            <Printer size={20} />
          </IconButton>
          <IconButton className="text-gray-600 hover:text-blue-600">
            <Share2 size={20} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
