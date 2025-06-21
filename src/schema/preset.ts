import type { MergeCoreCollection } from '../index.js';
import type { RDKRole } from './role.js';
import type { RDKUser } from './user.js';

export type RDKPreset<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_presets',
	{
		id: number;
		bookmark: string | null;
		user: RDKUser<Schema> | string | null;
		role: RDKRole<Schema> | string | null;
		collection: string | null; // TODO keyof complete schema
		search: string | null;
		layout: string | null;
		layout_query: Record<string, any> | null;
		layout_options: Record<string, any> | null;
		refresh_interval: number | null;
		filter: Record<string, any> | null;
		icon: string | null;
		color: string | null;
	}
>;
