import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Typography,
  TextField,
} from "@mui/material";

interface MyTable2Props {
  rows: any[];
  columns: any[];
  limit: number;
  count: number;
  page: number;
  loading: boolean;
  error?: string | null;
  onBackPage: () => void;
  onNextPage: () => void;
  onChangeLimit: (newLimit: number) => void;
}

const MyTable2: React.FC<MyTable2Props> = ({
  rows,
  columns,
  limit,
  count,
  page,
  loading,
  error,
  onBackPage,
  onNextPage,
  onChangeLimit,
}) => {
  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Typography color="error">Error: {error}</Typography>
      </div>
    );
  }

  return (
    <Paper className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <TableContainer component={Paper}>
        <Table>
          <TableHead className="bg-gray-100 dark:bg-gray-700">
            <TableRow>
              {columns?.map((column) => (
                <TableCell
                  key={column.field}
                  style={{ width: column.width }}
                  className="text-gray-900 dark:text-gray-100"
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => (
              <TableRow
                key={row._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {columns?.map((column) => (
                  <TableCell
                    key={column.field}
                    className="text-gray-900 dark:text-gray-100"
                  >
                    {column.cellRenderer
                      ? column.cellRenderer(row)
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700">
          <Button
            disabled={page === 1}
            onClick={onBackPage}
            className="text-gray-900 dark:text-gray-100"
          >
            Previous
          </Button>
          <span>
            Page {page} of {Math.ceil(count / limit)}
          </span>
          <Button
            disabled={rows.length < limit}
            onClick={onNextPage}
            className="text-gray-900 dark:text-gray-100"
          >
            Next
          </Button>
          <select
            value={limit}
            onChange={(e) => onChangeLimit(parseInt(e.target.value))}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </TableContainer>
    </Paper>
  );
};

export default MyTable2;
