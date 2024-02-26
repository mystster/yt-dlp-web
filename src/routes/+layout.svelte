<script lang="ts">
	import '../app.pcss';
	import './styles.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import type { dumpSingleJson } from '$lib/types/dumpSingleJson';
	import { mqttClient } from '$lib/mqtt/client';
	import { onMount } from 'svelte';

	onMount(() => {
		mqttClient.subscribe('test-topic', (err) => {
			if(!err){
				console.log('test-topic subscribed');
			}
		});
		mqttClient.on('message', (topic, message, packet) => {
			console.log(`{${message}} from ${topic}`);
		});
	});


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

</style>
