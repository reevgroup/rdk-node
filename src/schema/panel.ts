import type { MergeCoreCollection } from '../index.js';
import type { RDKUser } from './user.js';
import type { RDKDashboard } from './dashboard.js';

export type RDKPanel<Schema = any> = MergeCoreCollection<
	Schema,
	'rdk_panels',
	{
		id: string;
		dashboard: RDKDashboard<Schema> | string;
		name: string | null;
		icon: string | null;
		color: string | null;
		show_header: boolean;
		note: string | null;
		type: string;
		position_x: number;
		position_y: number;
		width: number;
		height: number;
		options: Record<string, any> | null;
		date_created: 'datetime' | null;
		user_created: RDKUser<Schema> | string | null;
	}
>;
