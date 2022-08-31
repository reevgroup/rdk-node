import { IAuth, AuthOptions } from '../auth';
import { IRDK } from '../rdk';
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
	UtilsHandler,
} from '../handlers';
import { IItems } from '../items';
import { ITransport, TransportOptions } from '../transport';
import { ItemsHandler } from './items';
import { Transport } from './transport';
import { Auth } from './auth';
import { IStorage } from '../storage';
import { LocalStorage, MemoryStorage, StorageOptions } from './storage';
import { TypeMap, TypeOf, PartialBy } from '../types';
import { GraphQLHandler } from '../handlers/graphql';
import { ISingleton } from '../singleton';
import { SingletonHandler } from '../handlers/singleton';

export type RDKStorageOptions = StorageOptions & { mode?: 'LocalStorage' | 'MemoryStorage' };

export type RDKOptions = {
	auth?: IAuth | PartialBy<AuthOptions, 'transport' | 'storage'>;
	transport?: ITransport | TransportOptions;
	storage?: IStorage | RDKStorageOptions;
};

export class RDK<T extends TypeMap> implements IRDK<T> {
	private _url: string;
	private _options?: RDKOptions;
	private _auth: IAuth;
	private _transport: ITransport;
	private _storage: IStorage;
	private _activity?: ActivityHandler<TypeOf<T, 'rdk_activity'>>;
	private _collections?: CollectionsHandler<TypeOf<T, 'rdk_collections'>>;
	private _fields?: FieldsHandler<TypeOf<T, 'rdk_fields'>>;
	private _files?: FilesHandler<TypeOf<T, 'rdk_files'>>;
	private _folders?: FoldersHandler<TypeOf<T, 'rdk_folders'>>;
	private _permissions?: PermissionsHandler<TypeOf<T, 'rdk_permissions'>>;
	private _presets?: PresetsHandler<TypeOf<T, 'rdk_presets'>>;
	private _relations?: RelationsHandler<TypeOf<T, 'rdk_relations'>>;
	private _revisions?: RevisionsHandler<TypeOf<T, 'rdk_revisions'>>;
	private _roles?: RolesHandler<TypeOf<T, 'rdk_roles'>>;
	private _users?: UsersHandler<TypeOf<T, 'rdk_users'>>;
	private _server?: ServerHandler;
	private _utils?: UtilsHandler;
	private _graphql?: GraphQLHandler;
	private _settings?: SettingsHandler<TypeOf<T, 'rdk_settings'>>;

	private _items: {
		[collection: string]: ItemsHandler<any>;
	};

	private _singletons: {
		[collection: string]: SingletonHandler<any>;
	};

	constructor(url: string, options?: RDKOptions) {
		this._url = url;
		this._options = options;
		this._items = {};
		this._singletons = {};

		if (this._options?.storage && this._options?.storage instanceof IStorage) this._storage = this._options.storage;
		else {
			const rdkStorageOptions = this._options?.storage as RDKStorageOptions | undefined;
			const { mode, ...storageOptions } = rdkStorageOptions ?? {};

			if (mode === 'MemoryStorage' || typeof window === 'undefined') {
				this._storage = new MemoryStorage(storageOptions);
			} else {
				this._storage = new LocalStorage(storageOptions);
			}
		}

		if (this._options?.transport && this._options?.transport instanceof ITransport)
			this._transport = this._options.transport;
		else {
			this._transport = new Transport({
				url: this.url,
				beforeRequest: async (config) => {
					await this._auth.refreshIfExpired();
					const token = this.storage.auth_token;
					const bearer = token
						? token.startsWith(`Bearer `)
							? String(this.storage.auth_token)
							: `Bearer ${this.storage.auth_token}`
						: '';

					return {
						...config,
						headers: {
							Authorization: bearer,
							...config.headers,
						},
					};
				},
				...this._options?.transport,
			});
		}

		if (this._options?.auth && this._options?.auth instanceof IAuth) this._auth = this._options.auth;
		else
			this._auth = new Auth({
				transport: this._transport,
				storage: this._storage,
				...this._options?.auth,
			} as AuthOptions);
	}

	get url() {
		return this._url;
	}

	get auth(): IAuth {
		return this._auth;
	}

	get storage(): IStorage {
		return this._storage;
	}

	get transport(): ITransport {
		return this._transport;
	}

	get activity(): ActivityHandler<TypeOf<T, 'rdk_activity'>> {
		return this._activity || (this._activity = new ActivityHandler<TypeOf<T, 'rdk_activity'>>(this.transport));
	}

	get collections(): CollectionsHandler<TypeOf<T, 'rdk_collections'>> {
		return (
			this._collections ||
			(this._collections = new CollectionsHandler<TypeOf<T, 'rdk_collections'>>(this.transport))
		);
	}

	get fields(): FieldsHandler<TypeOf<T, 'rdk_fields'>> {
		return this._fields || (this._fields = new FieldsHandler<TypeOf<T, 'rdk_fields'>>(this.transport));
	}

	get files(): FilesHandler<TypeOf<T, 'rdk_files'>> {
		return this._files || (this._files = new FilesHandler<TypeOf<T, 'rdk_files'>>(this.transport));
	}

	get folders(): FoldersHandler<TypeOf<T, 'rdk_folders'>> {
		return this._folders || (this._folders = new FoldersHandler<TypeOf<T, 'rdk_folders'>>(this.transport));
	}

	get permissions(): PermissionsHandler<TypeOf<T, 'rdk_permissions'>> {
		return (
			this._permissions ||
			(this._permissions = new PermissionsHandler<TypeOf<T, 'rdk_permissions'>>(this.transport))
		);
	}

	get presets(): PresetsHandler<TypeOf<T, 'rdk_presets'>> {
		return this._presets || (this._presets = new PresetsHandler<TypeOf<T, 'rdk_presets'>>(this.transport));
	}

	get relations(): RelationsHandler<TypeOf<T, 'rdk_relations'>> {
		return this._relations || (this._relations = new RelationsHandler<TypeOf<T, 'rdk_relations'>>(this.transport));
	}

	get revisions(): RevisionsHandler<TypeOf<T, 'rdk_revisions'>> {
		return this._revisions || (this._revisions = new RevisionsHandler<TypeOf<T, 'rdk_revisions'>>(this.transport));
	}

	get roles(): RolesHandler<TypeOf<T, 'rdk_roles'>> {
		return this._roles || (this._roles = new RolesHandler<TypeOf<T, 'rdk_roles'>>(this.transport));
	}

	get users(): UsersHandler<TypeOf<T, 'rdk_users'>> {
		return this._users || (this._users = new UsersHandler<TypeOf<T, 'rdk_users'>>(this.transport));
	}
	get settings(): SettingsHandler<TypeOf<T, 'rdk_settings'>> {
		return this._settings || (this._settings = new SettingsHandler<TypeOf<T, 'rdk_settings'>>(this.transport));
	}
	get server(): ServerHandler {
		return this._server || (this._server = new ServerHandler(this.transport));
	}

	get utils(): UtilsHandler {
		return this._utils || (this._utils = new UtilsHandler(this.transport));
	}

	get graphql(): GraphQLHandler {
		return this._graphql || (this._graphql = new GraphQLHandler(this.transport));
	}

	singleton<C extends string, I = TypeOf<T, C>>(collection: C): ISingleton<I> {
		return (
			this._singletons[collection] ||
			(this._singletons[collection] = new SingletonHandler<I>(collection, this.transport))
		);
	}

	items<C extends string, I = TypeOf<T, C>>(collection: C): IItems<I> {
		return this._items[collection] || (this._items[collection] = new ItemsHandler<I>(collection, this.transport));
	}
}
