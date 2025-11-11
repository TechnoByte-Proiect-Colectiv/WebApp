import { FC, useState } from "react";
import { InputBase, Paper, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
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
        onChange={(e) => setSearchQuery(e.target.value)}
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
