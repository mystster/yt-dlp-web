import fluentYTDlp from 'node-fluent-ytdlp';
import { error } from '@sveltejs/kit';
import { Readable } from 'stream';
import { db } from '$lib/db/db';

export function GET({ url }) {
	console.dir(db.prepare('select * from status').get());

	const videoUrl = url.searchParams.get('videourl');
	if (!videoUrl) {
		error(400, 'videourl not found');
	} else {
		const yt = new fluentYTDlp(videoUrl);
		yt.setBinaryPath({ ytdlp: 'yt-dlp', ffmpeg: 'ffmpeg', ffprobe: 'ffprobe' });
		const process = yt.dumpSingleJson().run();
		process.stderr.on('data', (str) => console.error(str));
		return new Response(Readable.toWeb(process.stdout) as ReadableStream);
	}
}
