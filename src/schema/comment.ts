import type { MergeCoreCollection } from '../index.js';
import type { RDKCollection } from './collection.js';
import type { RDKUser } from './user.js';

export type RDKComment<Schema> = MergeCoreCollection<
	Schema,
	'rdk_comments',
	{
		id: string;
		collection: RDKCollection<Schema> | string;
		item: string;
		comment: string;
		date_created: 'datetime' | null;
		date_updated: 'datetime' | null;
		user_created: RDKUser<Schema> | string | null;
		user_updated: RDKUser<Schema> | string | null;
	}
>;
