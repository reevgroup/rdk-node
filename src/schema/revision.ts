import type { MergeCoreCollection } from '../index.js';
import type { RDKActivity } from './activity.js';
import type { RDKVersion } from './version.js';

export type RDKRevision<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_revisions',
	{
		id: number;
		activity: RDKActivity<Schema> | number;
		collection: string; // TODO keyof complete schema
		item: string;
		data: Record<string, any> | null;
		delta: Record<string, any> | null;
		parent: RDKRevision<Schema> | number | null;
		version: RDKVersion<Schema> | string | null;
	}
>;
