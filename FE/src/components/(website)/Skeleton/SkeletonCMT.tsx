import { Skeleton } from "@mui/material";

const SkeletonCMT = () => {
  return (
    <div className="flex ">
      <Skeleton animation="wave" variant="circular" width={60} height={60} />
      <div className="ms-3">
        <Skeleton
          animation="wave"
          height={20}
          width={100}
          style={{ marginBottom: 6 }}
        />
        <Skeleton
          animation="wave"
          height={20}
          width={200}
          style={{ marginBottom: 6 }}
        />
      </div>
    </div>
  );
};

export default SkeletonCMT;
