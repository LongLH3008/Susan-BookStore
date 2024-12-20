import { CircularProgress, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

interface MyTable2Props {
  rows: any[];
  columns: any[];
  loading: boolean;
  error?: string | null;
}

const MyTable2: React.FC<MyTable2Props> = ({
  rows,
  columns,
  loading,
  error,
}) => {
  const paginationModel = { page: 0, pageSize: 5 };
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
  const rowsWithSTT = rows?.map((row: any, index: number) => ({
    ...row,
    stt: index + 1,
  }));
  return (
    <Paper className="bg-white h-[67vh] dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div style={{ height: "67vh", width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rowsWithSTT}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20]}
          getRowId={(row) => row?._id || row?.id}
          getRowHeight={() => "auto"}
          sx={{
            border: 0,
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              padding: "10px",
            },
          }}
          loading={loading}
        />
      </div>
    </Paper>
  );
};

export default MyTable2;
