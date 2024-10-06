import { IBlog } from "@/common/interfaces/blog";
import { getBlogs } from "@/services/blog";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { CircularProgress, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Blog"],
    queryFn: () => getBlogs(),
  });

  const onEdit = (id: string) => {
    console.log(id);
  };
  const onShowDetail = (blog: IBlog) => {
    console.log(blog);
  };
  const onDelete = (id: string) => {
    console.log(id);
  };
  const columns: GridColDef[] = [
    { field: "blog_title", headerName: "Title", flex: 1 },
    {
      field: "blog_image",
      headerName: "Image",
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.blog_title}
          style={{ width: "100%", height: "auto" }}
        />
      ),
      flex: 2,
    },
    {
      field: "blog_tags",
      headerName: "Tags",
      flex: 3,
    },
    {
      field: "active",
      headerName: "Active",
      renderCell: (params) => (
        <>
          <Tooltip title="Chỉnh sửa">
            <EditIcon onClick={() => onEdit(params.row._id)} />
          </Tooltip>
          <Tooltip title="Hiển thị chi tiết">
            <InfoIcon onClick={() => onShowDetail(params.row)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <DeleteIcon onClick={() => onDelete(params.row._id)} />
          </Tooltip>
        </>
      ),
    },
  ];
  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    refetch();
  };

  const paginationModel = { page: 0, pageSize: 5 };

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return (
      <Typography variant="h6" color="error">
        Error loading blogs.
      </Typography>
    );
  }

  if (!data || !data.metadata || !Array.isArray(data.metadata)) {
    return (
      <Typography variant="h6" color="textSecondary">
        No blogs available.
      </Typography>
    );
  }

  // Thêm thuộc tính `id` nếu dữ liệu không có sẵn
  const rows = data.metadata.map((row: any, index: number) => ({
    id: row._id || index, // Sử dụng _id nếu có, nếu không thì dùng index
    ...row,
  }));

  return (
    <>
      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          Danh sách tin tức
        </p>
      </div>
      <div className="grid grid-cols-2 ">
        <div className=""></div>
        <div className="grid grid-cols-3 gap-8 my-4">
          <form>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FaMagnifyingGlass />
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search"
                required
              />
            </div>
          </form>
          <Link
            to={"/quan-tri/tin-tuc/them-moi"}
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
          >
            Thêm tin tức
          </Link>
        </div>
      </div>

      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </>
  );
};

export default BlogPage;
