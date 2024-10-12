import React from "react";
import { Card, CardContent, CardHeader, Skeleton, Box } from "@mui/material";

const LoadingBlog = ({ index }: { index: number }) => {
  return (
    <Card key={index} sx={{ maxWidth: 345, margin: 2 }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        title={<Skeleton variant="text" width="80%" />}
        subheader={<Skeleton variant="text" width="60%" />}
      />

      <Skeleton variant="rectangular" height={190} />

      <CardContent>
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </CardContent>
    </Card>
  );
};

export default LoadingBlog;
