import { IAuth } from './auth';
import {
	ActivityHandler,
	CollectionsHandler,
	FieldsHandler,
	FilesHandler,
	FoldersHandler,
	PermissionsHandler,
	PresetsHandler,
	RelationsHandler,
	RevisionsHandler,
	RolesHandler,
	ServerHandler,
	SettingsHandler,
	UsersHandler,
} from './handlers';

import { IItems } from './items';
import { ITransport } from './transport';
import { UtilsHandler } from './handlers/utils';
import { IStorage } from './storage';
import { TypeMap, TypeOf } from './types';
import { GraphQLHandler } from './handlers/graphql';
import { ISingleton } from './singleton';

export type RDKTypes = {
	activity: undefined;
	collections: undefined;
	fields: undefined;
	files: undefined;
	folders: undefined;
	permissions: undefined;
	presets: undefined;
	relations: undefined;
	revisions: undefined;
	roles: undefined;
	settings: undefined;
	users: undefined;
};

export interface IRDKBase {
	readonly url: string;
	readonly auth: IAuth;
	readonly storage: IStorage;
	readonly transport: ITransport;
	readonly server: ServerHandler;
	readonly utils: UtilsHandler;
	readonly graphql: GraphQLHandler;
}

export interface IRDK<T extends TypeMap> extends IRDKBase {
	readonly activity: ActivityHandler<TypeOf<T, 'rdk_activity'>>;
	readonly collections: CollectionsHandler<TypeOf<T, 'rdk_collections'>>;
	readonly files: FilesHandler<TypeOf<T, 'rdk_files'>>;
	readonly fields: FieldsHandler<TypeOf<T, 'rdk_fields'>>;
	readonly folders: FoldersHandler<TypeOf<T, 'rdk_folders'>>;
	readonly permissions: PermissionsHandler<TypeOf<T, 'rdk_permissions'>>;
	readonly presets: PresetsHandler<TypeOf<T, 'rdk_presets'>>;
	readonly revisions: RevisionsHandler<TypeOf<T, 'rdk_revisions'>>;
	readonly relations: RelationsHandler<TypeOf<T, 'rdk_relations'>>;
	readonly roles: RolesHandler<TypeOf<T, 'rdk_roles'>>;
	readonly users: UsersHandler<TypeOf<T, 'rdk_users'>>;
	readonly settings: SettingsHandler<TypeOf<T, 'rdk_settings'>>;

	items<C extends string, I = TypeOf<T, C>>(collection: C): IItems<I>;
	singleton<C extends string, I = TypeOf<T, C>>(collection: C): ISingleton<I>;
}
