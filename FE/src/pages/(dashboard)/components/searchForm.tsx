import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

interface SearchFormProps {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  initialSearchTerm = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-end dark:bg-gray-800">
        <TextField
          label="Nhập từ khóa"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            className: "dark:text-white  ",
            classes: {
              notchedOutline: "dark:border-white",
            },
          }}
          InputLabelProps={{
            className: "dark:text-white",
          }}
          style={{
            margin: "16px 0",
            width: "200px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="ml-2 h-10 dark:text-white"
        >
          Tìm kiếm
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="ml-2 h-10 dark:text-white"
        >
          Thêm mới
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
