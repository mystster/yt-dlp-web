/* eslint-disable @typescript-eslint/no-explicit-any */
export interface dumpSingleJson {
	id: string;
	title: string;
	formats: Format[];
	thumbnails: Thumbnail[];
	thumbnail: string;
	description: string;
	channel_id: string;
	channel_url: string;
	duration: number;
	view_count: number;
	average_rating: any;
	age_limit: number;
	webpage_url: string;
	categories: string[];
	tags: string[];
	playable_in_embed: boolean;
	live_status: string;
	release_timestamp: number;
	_format_sort_fields: string[];
	automatic_captions: AutomaticCaptions;
	subtitles: Subtitles;
	comment_count: number;
	chapters: any;
	heatmap: any;
	like_count: number;
	channel: string;
	channel_follower_count: number;
	uploader: string;
	uploader_id: string;
	uploader_url: string;
	upload_date: string;
	availability: string;
	original_url: string;
	webpage_url_basename: string;
	webpage_url_domain: string;
	extractor: string;
	extractor_key: string;
	playlist: any;
	playlist_index: any;
	display_id: string;
	fulltitle: string;
	duration_string: string;
	release_date: string;
	release_year: number;
	is_live: boolean;
	was_live: boolean;
	requested_subtitles: any;
	_has_drm: any;
	epoch: number;
	requested_downloads: RequestedDownload[];
	requested_formats: RequestedFormat[];
	format: string;
	format_id: string;
	ext: string;
	protocol: string;
	language: any;
	format_note: string;
	filesize_approx: number;
	tbr: number;
	width: number;
	height: number;
	resolution: string;
	fps: number;
	dynamic_range: string;
	vcodec: string;
	vbr: number;
	stretched_ratio: any;
	aspect_ratio: number;
	acodec: string;
	abr: number;
	asr: number;
	audio_channels: number;
	_type: string;
	_version: Version;
}

export interface Format {
	format_id: string;
	format_note?: string;
	ext: string;
	protocol: string;
	acodec?: string;
	vcodec: string;
	url: string;
	width?: number;
	height?: number;
	fps?: number;
	rows?: number;
	columns?: number;
	fragments?: Fragment[];
	resolution: string;
	aspect_ratio?: number;
	http_headers: HttpHeaders;
	audio_ext: string;
	video_ext: string;
	vbr?: number;
	abr?: number;
	tbr?: number;
	format: string;
	format_index: any;
	manifest_url?: string;
	language: any;
	preference: any;
	quality?: number;
	has_drm?: boolean;
	source_preference?: number;
	asr?: number;
	filesize?: number;
	audio_channels?: number;
	language_preference?: number;
	dynamic_range?: string;
	container?: string;
	downloader_options?: DownloaderOptions;
	filesize_approx?: number;
}

export interface Fragment {
	url: string;
	duration: number;
}

export interface HttpHeaders {
	'User-Agent': string;
	Accept: string;
	'Accept-Language': string;
	'Sec-Fetch-Mode': string;
}

export interface DownloaderOptions {
	http_chunk_size: number;
}

export interface Thumbnail {
	url: string;
	preference: number;
	id: string;
	height?: number;
	width?: number;
	resolution?: string;
}

export interface AutomaticCaptions {}

export interface Subtitles {
	live_chat: LiveChat[];
}

export interface LiveChat {
	url: string;
	video_id: string;
	ext: string;
	protocol: string;
}

export interface RequestedDownload {
	requested_formats: RequestedFormat[];
	format: string;
	format_id: string;
	ext: string;
	protocol: string;
	format_note: string;
	filesize_approx: number;
	tbr: number;
	width: number;
	height: number;
	resolution: string;
	fps: number;
	dynamic_range: string;
	vcodec: string;
	vbr: number;
	aspect_ratio: number;
	acodec: string;
	abr: number;
	asr: number;
	audio_channels: number;
	_filename: string;
	filename: string;
	__write_download_archive: boolean;
}

export interface RequestedFormat {
	format_id: string;
	format_index: any;
	url: string;
	manifest_url?: string;
	tbr: number;
	ext: string;
	fps?: number;
	protocol: string;
	preference: any;
	quality: number;
	has_drm: boolean;
	width?: number;
	height?: number;
	vcodec: string;
	acodec: string;
	dynamic_range?: string;
	source_preference: number;
	format_note: string;
	resolution: string;
	aspect_ratio?: number;
	http_headers: HttpHeaders;
	video_ext: string;
	audio_ext: string;
	abr: number;
	vbr: number;
	format: string;
	asr?: number;
	filesize?: number;
	audio_channels?: number;
	language: any;
	language_preference?: number;
	container?: string;
	downloader_options?: DownloaderOptions;
}

export interface Version {
	version: string;
	current_git_head: any;
	release_git_head: string;
	repository: string;
}
