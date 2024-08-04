import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouterWebsite from "./routers/router.website";

export default function App() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<RouterWebsite />
		</QueryClientProvider>
	);
}
