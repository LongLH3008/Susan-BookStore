import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toast } from "./components/Toast";
import RouterWebsite from "./routers/router";

export default function App() {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<Toast />
			<RouterWebsite />
		</QueryClientProvider>
	);
}
