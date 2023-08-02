import { initTRPC } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create();

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;

export const appRouter = router({
	hello: procedure.query((opts) => {
		return {
			greeting: `hello `,
		};
	}),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
// @see https://trpc.io/docs/server/adapters
export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => ({}),
});
