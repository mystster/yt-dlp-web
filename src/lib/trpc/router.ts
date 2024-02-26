import { t } from '$lib/trpc/t';
import { videos } from './routes/videos';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { logger } from './middleware/logger';

export const router = t.router({
	greeting: t.procedure.use(logger).query(async () => {
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),
	videos,
});

export type Router = typeof router;
export type RouterInputs = inferRouterInputs<Router>;
export type RouterOutputs = inferRouterOutputs<Router>;
