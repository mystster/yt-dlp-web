import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';


export const videos = t.router({
    getInfo: t.procedure
        .use(logger)
        .input(z.string())
        .query(({ input }) => {
            return `${input}`;
    }),
});