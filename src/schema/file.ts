import type { MergeCoreCollection } from '../index.js';
import type { RDKFolder } from './folder.js';
import type { RDKUser } from './user.js';

// Base type for rdk_files
export type RDKFile<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_files',
	{
		id: string;
		storage: string;
		filename_disk: string | null;
		filename_download: string;
		title: string | null;
		type: string | null;
		folder: RDKFolder<Schema> | string | null;
		uploaded_by: RDKUser<Schema> | string | null;
		uploaded_on: 'datetime';
		modified_by: RDKUser<Schema> | string | null;
		modified_on: 'datetime';
		charset: string | null;
		filesize: string | null;
		width: number | null;
		height: number | null;
		duration: number | null;
		embed: unknown | null;
		description: string | null;
		location: string | null;
		tags: string[] | null;
		metadata: Record<string, any> | null;
		focal_point_x: number | null;
		focal_point_y: number | null;
	}
>;
