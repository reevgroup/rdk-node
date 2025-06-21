import type { MergeCoreCollection } from '../index.js';
import type { RDKRole } from './role.js';
import type { RDKUser } from './user.js';

export type RDKShare<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_shares',
	{
		id: string;
		name: string | null;
		collection: string | null;
		item: string | null;
		role: RDKRole<Schema> | string | null;
		password: string | null;
		user_created: RDKUser<Schema> | string | null;
		date_created: 'datetime' | null;
		date_start: 'datetime' | null;
		date_end: 'datetime' | null;
		times_used: number | null;
		max_uses: number | null;
	}
>;
