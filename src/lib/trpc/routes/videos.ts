import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { z } from 'zod';
import fluentYTDlp from 'node-fluent-ytdlp';

export const videos = t.router({
	getInfo: t.procedure
		.use(logger)
        .input(z.string())
		.query(async ({ input }) => {
			// https://stackoverflow.com/questions/68124247/waiting-for-stream-input-from-child-process-in-node-js
			return new Promise((resolve, reject) => {
				const yt = new fluentYTDlp(input);
                let result: string = '';
                let error: string = '';
				yt.setBinaryPath({ ytdlp: 'yt-dlp', ffmpeg: 'ffmpeg', ffprobe: 'ffprobe' });
				const process = yt.dumpSingleJson().run();
                process.stdout.on('data', (str) => (result += str));
                process.stderr.on('data', (str) => error += str);
				process.on('close', () => error ? reject(error) : resolve(JSON.parse(result)));
			});
		})
});
