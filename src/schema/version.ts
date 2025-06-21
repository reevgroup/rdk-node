import type { MergeCoreCollection } from '../index.js';
import type { RDKCollection } from './collection.js';
import type { RDKUser } from './user.js';

export type RDKVersion<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_versions',
	{
		id: string;
		key: string;
		name: string | null;
		collection: RDKCollection<Schema> | string;
		item: string;
		hash: string;
		date_created: 'datetime' | null;
		date_updated: 'datetime' | null;
		user_created: RDKUser<Schema> | string | null;
		user_updated: RDKUser<Schema> | string | null;
		delta: Record<string, any> | null;
	}
>;
