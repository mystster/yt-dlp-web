import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const defaultProcedure = t.procedure.use(
	t.middleware(async ({ path, type, next }) => {
		const start = Date.now();
		const result = await next();
		const ms = Date.now() - start;
		console.log(`${result.ok ? 'OK' : 'ERR'} ${type} ${path} - ${ms}ms`);
		return result;
	})
);
