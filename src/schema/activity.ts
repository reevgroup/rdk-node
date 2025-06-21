import type { MergeCoreCollection } from '../index.js';
import type { RDKRevision } from './revision.js';
import type { RDKUser } from './user.js';

export type RDKActivity<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_activity',
	{
		id: number;
		action: string;
		user: RDKUser<Schema> | string | null;
		timestamp: 'datetime';
		ip: string | null;
		user_agent: string | null;
		collection: string;
		item: string;
		origin: string | null;
		revisions: RDKRevision<Schema>[] | number[] | null;
	}
>;
