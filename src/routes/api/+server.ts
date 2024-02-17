import fluentYTDlp from 'node-fluent-ytdlp';
import { error } from '@sveltejs/kit';
import { Readable } from 'stream';
export function GET({ url }) {
    const videoUrl = url.searchParams.get('videourl');
    if (!videoUrl) {
        error(400, "videourl not found");
    } else {
        const yt = new fluentYTDlp(videoUrl);
        yt.setBinaryPath({ ytdlp: 'yt-dlp', ffmpeg: 'ffmpeg', ffprobe: 'ffprobe' });
        const process = yt.dumpSingleJson().run();
        process.stderr.on('data', (str) => console.error(str));
        return new Response(Readable.toWeb(process.stdout) as ReadableStream);
    }
}