"use client";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { SessionProvider } from "next-auth/react";

const Providers = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient();

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
