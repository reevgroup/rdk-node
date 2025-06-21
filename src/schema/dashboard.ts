import type { MergeCoreCollection } from '../index.js';
import type { RDKUser } from './user.js';

export type RDKDashboard<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_dashboards',
	{
		id: string;
		name: string;
		icon: string;
		note: string | null;
		date_created: 'datetime' | null;
		user_created: RDKUser<Schema> | string | null;
		color: string | null;
	}
>;
