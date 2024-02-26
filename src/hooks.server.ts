import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import portscanner from 'portscanner';
import { PUBLIC_MQTT_WEBSOCKET_PORT } from '$env/static/public';

import Aedes from 'aedes';
import { createServer } from 'aedes-server-factory';

export const handle: Handle = createTRPCHandle({ router, createContext });
const port = parseInt(PUBLIC_MQTT_WEBSOCKET_PORT); 

portscanner.checkPortStatus( port, 'localhost', (err, status) => {
	if (status == 'closed') {
		const aedes = new Aedes();
		const server = createServer(aedes, { ws: true });

		server.listen(port, function () {
			console.log('mqtt broker with websocket started and listening on port ', port);
		});
	} else {
		console.log('mqtt broker already running');
	}
	if (err) {
		console.log(`node port check error:${err}`);
	}
});
