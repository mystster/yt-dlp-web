<script lang="ts">
	import type { dumpSingleJson } from '$lib/types/dumpSingleJson';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';


	export let jsonData: dumpSingleJson;
	let videoCodec: string, audioCodec: string;
	const modalStore = getModalStore();

	async function startDownloadVideo() {
		await trpc($page).videos.downloadVideo.mutate({
			url: jsonData?.original_url,
			codec: `${videoCodec}+${audioCodec}`
		});
		modalStore.close();
	}
</script>

<div class="bg-white p-6">
	<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
		<div class="md:col-span-1">
			<div class="aspect-w-1 aspect-h-1">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					alt="Placeholder image"
					class="rounded-lg object-cover"
					height="192"
					src={jsonData?.thumbnail ?? jsonData?.thumbnails[0]?.url ?? ''}
					width="192"
				/>
			</div>
		</div>
		<form class="space-y-4 md:col-span-2">
			<label class="label">
				<span>Title</span>
				<input
					type="text"
					class="input"
					disabled
					value={jsonData?.title ?? ''}
				/>
			</label>
			<label class="label">
				<span>length</span>
				<input
					type="text"
					class="input"
					disabled
					value={jsonData?.duration_string ?? ''}
				/>
			</label>
			<label class="label">
				<span>URL</span>
				<input
					type="text"
					class="input"
					disabled
					value={jsonData?.original_url ?? ''}
				/>
			</label>
			<label class="label">
				<span>画質</span>
				<select class="select" bind:value={videoCodec}>
					{#each jsonData?.formats.filter((x) => x.format_note && x.vcodec && x.vcodec.startsWith('vp09')) as item}
						<option value={item.format_id}
							>{item.format_note}_{item.vcodec}_{item.format_id}</option
						>
					{/each}
				</select>
			</label>
			<label class="label">
				<span>音質</span>
				<select class="select" bind:value={audioCodec}>
					{#each jsonData?.formats.filter((x) => x.acodec && x.acodec == 'opus') as item}
						<option value={item.format_id}
							>{item.format_note}_{item.acodec}_{item.format_id}</option
						>
					{/each}
				</select>
			</label>
		</form>
	</div>
	<div class="mt-6 flex justify-end space-x-4">
		<button class="variant-outline btn" on:click={() => modalStore.close()}
			>Cancel</button
		>
		<button class="variant-filled-primary btn" on:click={startDownloadVideo}
			>Add Video</button
		>
	</div>
</div>
