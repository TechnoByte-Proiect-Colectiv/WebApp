import { FC, useState, useEffect } from "react";
import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useProducts } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom"; 


const PRODUCT_LIST_PATH = "/products";

export const SearchBar: FC = () => {
  const { setSearchTerm, searchTerm } = useProducts(); 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm === "") {
        setSearchQuery("");
    }
  }, [searchTerm]);

  const updateSearchTerm = (query: string) => {
    setSearchQuery(query);
    setSearchTerm(query);
  };

  const handleSearch = () => {
    setSearchTerm(searchQuery); 
    navigate(PRODUCT_LIST_PATH);
  };

  const handleClear = () => {
    updateSearchTerm("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      handleSearch(); 
    }
  };

  return (
    <Paper
      component="div"
      className="flex items-center bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-2 w-full max-w-md shadow-sm hover:shadow-md transition-shadow"
    >
      <InputBase
        placeholder="Search products..."
        className="flex-1"
        value={searchQuery}
        onChange={(e) => updateSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress} 
        inputProps={{
          className: "text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400",
        }}
      />
      {searchQuery && (
        <IconButton
          size="small"
          onClick={handleClear}
          className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      )}
      <IconButton
        onClick={handleSearch} 
        className="text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};