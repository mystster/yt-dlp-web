import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import type { Handle } from '@sveltejs/kit';
import { createTRPCHandle } from 'trpc-sveltekit';
import { soft_error } from 'socio/logging.js';
import { SocioServer } from 'socio/core-server.js';
import net from 'net';
import type { id } from 'socio/types.js';
import type { SocioSession } from 'socio/core-session.js';

import {db} from '$lib/db/db';

export const handle: Handle = createTRPCHandle({ router, createContext });

const porttest = net.createServer();
porttest.once('listening', () => {
	porttest.close();
	try {
		const db_interface = SetUpDB();
		new SocioServer(
			{ port: 3000 },
			{
				db: db_interface,
				logging: { verbose: true, hard_crash: false }
			}
		);
		console.log('database is ready');
	} catch (e: any) {
		soft_error(e);
	}
});
porttest.on('error', () => console.log('socio server already running'));
porttest.listen(3000);

function SetUpDB() {
	db.prepare('create table status(ID INTEGER PRIMARY KEY, PERCENT INTEGER)').run();
	db.prepare('insert into status (ID, PERCENT) values (1, 50)').run();
	return {
		Query: (client: SocioSession, id: id, sql: string, params: any) =>
			db.prepare(sql).get(params) as Promise<object>
	};
}
