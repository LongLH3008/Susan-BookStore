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
      <div className="flex items-center justify-end bg-gray-50 dark:bg-gray-800 ">
        <TextField
          label="Nhập từ khóa"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            margin: "16px 0",
            width: "200px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px", height: "40px" }}
        >
          Tìm kiếm
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginLeft: "10px", height: "40px" }}
        >
          Thêm mới
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
