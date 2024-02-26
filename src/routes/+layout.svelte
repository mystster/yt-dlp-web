<script lang="ts">
	import '../app.pcss';
	import './styles.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import type { dumpSingleJson } from '$lib/types/dumpSingleJson';
	import mqtt from 'mqtt';
	
	const client = mqtt.connect('ws://localhost:1883');
	client.on('connect', () => {
		console.log('mqtt client connected');
		client.subscribe('test-topic', (err) => {
			if(!err){
				console.log('test-topic subscribed');
			}
		});
	});
	client.on('message', () => {console.log('message recieved')});


	let url = '';
	async function getVideoInfo() {
		if (url) {
			try {
				const json= await trpc($page).videos.getInfo.query(url) as dumpSingleJson;
				console.log(json);
			} catch (error: any) {
				console.log(`error!!!\n${error.message}`);
				console.dir(error);
			}
		}
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<input
					type="text"
					class="input"
					placeholder="download url"
					bind:value={url}
				/>
				<button type="button" class="variant-filled btn" on:click={getVideoInfo}
					>Add</button
				>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
