import { Card, CardContent, CardHeader, Skeleton } from "@mui/material";

const LoadingBlog = () => {
	return (
		<Card sx={{ maxWidth: 345, margin: 2 }}>
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
