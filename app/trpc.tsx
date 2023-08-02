"use client";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { AppRouter } from "../pages/api/trpc/[trpc]";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createTRPCReact } from "@trpc/react-query";

function getBaseUrl() {
	if (typeof window !== "undefined")
		// browser should use relative path
		return "";

	// assume localhost
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCReact<AppRouter, unknown, "ExperimentalSuspense">(
	{
		unstable_overrides: {
			useMutation: {
				async onSuccess(opts) {
					await opts.originalFn();
					await opts.queryClient.invalidateQueries();
				},
			},
		},
	}
);

export const trpcVanilla = createTRPCProxyClient<AppRouter>({
	links: [
		httpBatchLink({
			url: `${getBaseUrl()}/api/trpc`,
		}),
	],
});

export function ClientProvider(props: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				loggerLink({
					enabled: () => true,
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
				}),
			],
		})
	);
	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				{props.children}
			</QueryClientProvider>
		</trpc.Provider>
	);
}
