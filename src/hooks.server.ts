import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import net from 'net';

import Aedes from 'aedes';
import { createServer } from 'aedes-server-factory';

export const handle: Handle = createTRPCHandle({ router, createContext });

const porttest2 = net.createServer();
porttest2.once('listening', () => {
	porttest2.close();
	const aedes = new Aedes();
	const server = createServer(aedes, { ws: true });

	server.listen(1883, function () {
		console.log('mqtt broker with websocket started and listening on port ', 1883);
	});
});
porttest2.on('error', () => console.log('mqtt broker already running'));
porttest2.listen(1883);
