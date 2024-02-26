import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import portscanner from 'portscanner';

import Aedes from 'aedes';
import { createServer } from 'aedes-server-factory';

export const handle: Handle = createTRPCHandle({ router, createContext });

portscanner.checkPortStatus(1833, 'localhost', (err, status) => {
	if (status == 'open') {
		const aedes = new Aedes();
		const server = createServer(aedes, { ws: true });

		server.listen(1883, function () {
			console.log('mqtt broker with websocket started and listening on port ', 1883);
		});
	} else {
		console.log('mqtt broker already running');
	}
	if (err) {
		console.log(`node port check error:${err}`);
	}
});
