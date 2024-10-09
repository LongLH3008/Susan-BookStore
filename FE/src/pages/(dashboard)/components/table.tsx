import React from "react";
import { Paper, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridPaginationModel, GridSortModel } from "@mui/x-data-grid";

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
  const [paginationModel, setPaginationModel] =
    React.useState<GridPaginationModel>({
      page: page - 1, // Chuyển từ 1-based sang 0-based để tương thích với DataGrid
      pageSize: limit,
    });

  React.useEffect(() => {
    setPaginationModel((prev) => ({
      ...prev,
      page: page - 1,
      pageSize: limit,
    }));
  }, [page, limit]);

  const handlePaginationChange = (newModel: GridPaginationModel) => {
    if (newModel.pageSize !== limit) {
      onChangeLimit(newModel.pageSize);
    }
    if (newModel.page + 1 !== page) {
      if (newModel.page + 1 > page) {
        onNextPage();
      } else {
        onBackPage();
      }
    }
  };

  const [sortModel, setSortModel] = React.useState<GridSortModel>([]);

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
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pagination
          paginationModel={paginationModel}
          pageSizeOptions={[5, 10, 20]}
          rowCount={count}
          paginationMode="server"
          getRowId={(row) => row?._id || row?.id}
          sortModel={sortModel}
          checkboxSelection
          sx={{ border: 0 }}
          onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
          onPaginationModelChange={handlePaginationChange}
          loading={loading}
        />
      </div>
    </Paper>
  );
};

export default MyTable2;
