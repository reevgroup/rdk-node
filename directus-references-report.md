# Directus References Report - src Directory

## Summary

Total files containing "Directus" or "directus": **132 files**

## Key Categories of References

### 1. Type/Interface Definitions

#### Client Types (`src/types/`)
- **client.ts**
  - Line 4: Comment "empty directus client"
  - Line 6: `export interface DirectusClient<Schema>`
  - Line 9: Method signature using `DirectusClient`

- **error.ts**
  - Line 1: `export interface DirectusApiError`
  - Line 9: `export interface DirectusError`
  - Line 10: Uses `DirectusApiError[]`

#### Schema Types (`src/schema/`)
All core collection types are defined with `DirectusXXX` naming convention:

- **activity.ts** - Line 7: `'directus_activity'`
- **access.ts** - Line 8: `'directus_access'`
- **collection.ts** 
  - Line 3: `export type DirectusCollection<Schema = any>`
  - Line 7: `'directus_collections'`
- **comment.ts** - Line 7: `'directus_comments'`
- **dashboard.ts** 
  - Line 4: `export type DirectusDashboard<Schema = any>`
  - Line 6: `'directus_dashboards'`
- **extension.ts** 
  - Line 3: `export type DirectusExtension<Schema = any>`
  - Line 7: `'directus_extensions'`
- **field.ts** - Line 9: `'directus_fields'`
- **file.ts** 
  - Line 5: Comment "Base type for directus_files"
  - Line 6: `export type DirectusFile<Schema = any>`
  - Line 8: `'directus_files'`
- **flow.ts** 
  - Line 5: `export type DirectusFlow<Schema = any>`
  - Line 7: `'directus_flows'`
- **folder.ts** 
  - Line 5: `'directus_folders'`
  - Type definition for `DirectusFolder`
- **notification.ts** 
  - Line 6: `'directus_notifications'`
  - Type definition for `DirectusNotification`
- **operation.ts** 
  - Line 5: `export type DirectusOperation<Schema = any>`
  - Line 7: `'directus_operations'`
- **panel.ts** 
  - Line 5: `export type DirectusPanel<Schema = any>`
  - Line 7: `'directus_panels'`
- **permission.ts** 
  - Line 6: `'directus_permissions'`
  - Type definition for `DirectusPermission`
- **policy.ts** - Line 8: `'directus_policies'`
- **preset.ts** 
  - Line 5: `export type DirectusPreset<Schema = any>`
  - Line 7: `'directus_presets'`
- **relation.ts** - Line 9: `'directus_relations'`
- **revision.ts** 
  - Line 5: `export type DirectusRevision<Schema = any>`
  - Line 7: `'directus_revisions'`
- **role.ts** 
  - Line 5: `export type DirectusRole<Schema = any>`
  - Line 7: `'directus_roles'`
- **settings.ts** 
  - Line 4: `export type DirectusSettings<Schema = any>`
  - Line 6: `'directus_settings'`
- **share.ts** 
  - Line 5: `export type DirectusShare<Schema = any>`
  - Line 7: `'directus_shares'`
- **translation.ts** 
  - Line 3: `export type DirectusTranslation<Schema = any>`
  - Line 5: `'directus_translations'`
- **user.ts** 
  - Line 7: Comment "directus_users type"
  - Line 11: `'directus_users'`
  - Type definition for `DirectusUser`
- **version.ts** 
  - Line 7: `'directus_versions'`
  - Type definition for `DirectusVersion`
- **webhook.ts** 
  - Line 5: `'directus_webhooks'`
  - Type definition for `DirectusWebhook`

- **core.ts** - Imports ALL DirectusXXX types (Lines 1-21) and defines CoreSchema interface (Lines 24-45)

### 2. Client Creation Functions

- **client.ts**
  - Line 14: Comment "Creates a client to communicate with a Directus app"
  - Line 16: Comment "@param url The URL to the Directus app"
  - Line 19: Comment "@returns A Directus client"
  - Line 21: `export const createDirectus = <Schema = any>(...): DirectusClient<Schema>`

### 3. Authentication (`src/auth/`)

- **composable.ts**
  - Line 32: Comment "Creates a client to authenticate with Directus"
  - Line 37: Comment "@returns A Directus authentication client"
  - Line 40: Function returning `DirectusClient<Schema>): AuthenticationClient<Schema>`

- **static.ts**
  - Line 5: Comment "Creates a client to authenticate with Directus using a static token"
  - Line 9: Comment "@returns A Directus static token client"
  - Line 12: Function using `DirectusClient<Schema>`

### 4. GraphQL Integration (`src/graphql/`)

- **composable.ts**
  - Line 10: Comment "Creates a client to communicate with Directus GraphQL"
  - Line 12: Comment "@returns A Directus GraphQL client"
  - Line 15: Function using `DirectusClient<Schema>): GraphqlClient<Schema>`

### 5. Realtime/WebSocket (`src/realtime/`)

- **composable.ts**
  - Line 34: Comment "Creates a client to communicate with a Directus REST WebSocket"
  - Line 38: Comment "@returns A Directus realtime client"
  - Line 41: Function using `DirectusClient<Schema>`
  - Line 62: Logger message `'[Directus SDK]'`
  - Line 341: Comment "// TODO use directus error"

### 6. REST Commands (`src/rest/commands/`)

All CRUD operations follow the same pattern, importing and using DirectusXXX types:

#### Create Commands
- Each file imports corresponding `DirectusXXX` type
- Functions accept `Partial<DirectusXXX<Schema>>` for item creation
- Returns typed responses using the schema types

#### Read Commands  
- Import `DirectusXXX` types for type safety
- Query functions use the schema types for filtering and response typing

#### Update Commands
- Similar pattern to create commands
- Accept partial updates to DirectusXXX types

#### Delete Commands
- Use `DirectusXXX<Schema>['id']` for key types
- Type-safe deletion by collection

### 7. Utility Functions (`src/utils/` and `src/rest/utils/`)

- **is-directus-error.ts**
  - Line 1: Imports `DirectusError` type
  - Line 4: Comment "A type guard to check if an error is a Directus API error"
  - Line 6: `export function isDirectusError(error: unknown): error is DirectusError`

- **throw-core-collection.ts**
  - Line 7: Comment "@throws Throws an error if the collection starts with the `directus_` prefix"

- **is-system-collection.ts**
  - Line 2: Comment about "@directus/system-data package"

### 8. Schema Snapshots

- **rest/commands/schema/snapshot.ts**
  - Line 6: Interface property `directus: string;`

### 9. Documentation References

- **types/filters.ts**
  - Line 80: Comment with URL "https://docs.directus.io/reference/filter-rules.html#filter-operators"

### 10. Main Export File

- **index.ts**
  - Line 10: `export * from './utils/is-directus-error.js';`

## File Type Distribution

- **TypeScript Files (.ts)**: 132 files
- **JavaScript Files (.js)**: 0 files (all source files are TypeScript)
- **JSON Files**: 0 files containing "directus" in src
- **Markdown Files**: 0 files containing "directus" in src

## Pattern Analysis

1. **Naming Convention**: All core collections follow `directus_[collection_name]` pattern
2. **Type Safety**: Extensive use of generic types `DirectusXXX<Schema>` for type safety
3. **Modular Architecture**: Clear separation between auth, REST, GraphQL, and realtime modules
4. **Consistent API**: All REST commands follow similar patterns for CRUD operations
5. **Schema-First**: Strong emphasis on schema types throughout the codebase

## Key Observations

1. The codebase is entirely TypeScript with no JavaScript files
2. "Directus" appears primarily in:
   - Type/Interface names (PascalCase)
   - Comments and documentation
   - String literals for collection names (lowercase with underscore)
3. All system collections are prefixed with `directus_`
4. The SDK provides multiple client types (REST, GraphQL, WebSocket)
5. Strong type safety throughout with generic schema support