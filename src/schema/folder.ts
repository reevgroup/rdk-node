import type { MergeCoreCollection } from '../index.js';

export type RDKFolder<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_folders',
	{
		id: string;
		name: string;
		parent: RDKFolder<Schema> | string | null;
	}
>;
