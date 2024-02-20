// https://github.com/alex8088/electron-vite/blob/7f13ea2a845b2759f89a483cc72bfab941cfda9f/node.d.ts#L4
// node worker
declare module '*?nodeWorker' {
	import { Worker, WorkerOptions } from 'node:worker_threads';
	export default function (options: WorkerOptions): Worker;
}
