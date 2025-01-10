import { Box, Skeleton } from "@mui/material";

const BlogDetailLoading = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Skeleton variant="text" width="80%" height={80} />

      <Skeleton
        variant="rectangular"
        width="100%"
        height={400}
        sx={{ marginTop: 3 }}
      />

      <Skeleton variant="text" width="95%" height={50} sx={{ marginTop: 3 }} />
      <Skeleton variant="text" width="90%" height={50} />
      <Skeleton variant="text" width="85%" height={50} />
      <Skeleton variant="text" width="80%" height={50} />
    </Box>
  );
};

export default BlogDetailLoading;
