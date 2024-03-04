<script lang="ts">
	import '../app.pcss';
	import './styles.css';
	import { AppShell, AppBar, type ModalComponent } from '@skeletonlabs/skeleton';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import type { dumpSingleJson } from '$lib/types/dumpSingleJson';
	import { mqttClient } from '$lib/mqtt/client';
	import { onMount } from 'svelte';
	import type { OnMessageCallback } from 'mqtt';
	import { initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import AddVideoPopup from '$lib/components/addVideoPopup.svelte';

	initializeStores();

	const modalStore = getModalStore();

	onMount(() => {
		mqttClient.subscribe('test-topic', (err) => {
			if(!err){
				console.log('test-topic subscribed');
			}
		});
		const onMessage: OnMessageCallback =  (topic, message, packet) => {
			console.log(`{${message}} from ${topic}`);
		};
		mqttClient.on('message', onMessage);

		return ()=>{
			mqttClient.off('message', onMessage);
			mqttClient.unsubscribe('test-topic');
			console.log('test-topic unsubscribed');
		}
	});

	let url = '';
	async function getVideoInfo() {
		if (url) {
			try {
				const json= await trpc($page).videos.getInfo.query(url) as dumpSingleJson;
				console.log(json);
				const modalComponent: ModalComponent = {
					ref: AddVideoPopup,
					props: {jsonData: json},
				};
				modalStore.trigger({
					type: 'component',
					component: modalComponent,
					
				});
			} catch (error: any) {
				console.log(`error!!!\n${error.message}`);
				console.dir(error);
			}
		}
	}
</script>

<Modal />
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
