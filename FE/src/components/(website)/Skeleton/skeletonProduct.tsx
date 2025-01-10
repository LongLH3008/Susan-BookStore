import { Skeleton } from "@mui/material";

const SkeletonProduct = () => {
  return (
    <div>
      <Skeleton variant="rectangular" width="100%" height="35dvh" />

      <div className="flex flex-col gap-1 border-t py-4 ">
        <Skeleton variant="text" width="50%" />

        <Skeleton variant="text" width="80%" height={24} />

        <Skeleton variant="text" width="60%" />

        <Skeleton variant="text" width="40%" height={28} />
      </div>
    </div>
  );
};

export default SkeletonProduct;
