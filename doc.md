---
title: RDK SDK
description: A JavaScript and TypeScript library that simplifies working with RDK.
---

The RDK SDK allows to work with RDK directly in your JavaScript and TypeScript projects. The SDK is split into separate modules, giving granular control over which features to include and which can be pruned at build-time. It is lightweight and dependency-free.

```bash
npm install @rdk/sdk
```

## Create a Client

The RDK SDK is a "Composable Client" that allows you to customize and build a client with the specific features you need. The client starts as an empty wrapper without any functionality. To add features, import and use the following composables:

| Composable         | Description                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| `rest()`           | Adds `.request()` method for making REST requests.                                                            |
| `graphql()`        | Adds `.query()` method for making GraphQL requests.                                                           |
| `authentication()` | Adds `.login()`, `.logout()`, and `.refresh()` methods. Also adds token handling.                             |
| `realtime()`       | Adds `.connect()`, `.subscribe()`, `.sendMessage()`, and `.onWebSocket()` methods. Also adds reconnect logic. |
| `staticToken()`    | Adds `.setToken()` and `.getToken()` methods for manually managing tokens.                                    |

::tabs
  ::div{class="pr-6"}
  ---
  label: JavaScript
  ---
  ```js
  import { createRDK, rest } from '@rdk/sdk';
  const rdk = createRDK('SERVER_URL').with(rest());
  ```
  ::

  ::div{class="pr-6"}
  ---
  label: TypeScript
  ---
  You must provide a `Schema` when creating a RDK client to make use of type hinting and completion. This schema contains definitions for each collection and provides you with type hints (on input) and completion (on output).

  ```ts
  import { createRDK, rest } from '@rdk/sdk';

  interface Post {
    id: number;
    title: string;
    content: string;
  }

  interface Schema {
    posts: Post[];
  }

  const rdk = createRDK<Schema>('SERVER_URL').with(rest());
  ```

  ::callout{icon="material-symbols:school-outline" color="secondary" to="/tutorials/tips-and-tricks/advanced-types-with-the-rdk-sdk"}
  Learn how to create a Schema for SDK client creation.
  ::
  ::
::


## Making Requests

To make a request, you must create the client with the `rest()` or `graphql()` composable. If using `rest()`, you must also import and use one of the query functions.

```js
import { createRDK, rest, readItems } from '@rdk/sdk';
const rdk = createRDK('SERVER_URL').with(rest());

const allPosts = await rdk.request(readItems('posts'));

const somePosts = await rdk.request(
  readItems('posts', {
    filter: { status: { _eq: 'published' } },
    sort: ['-date_created'],
    fields: ['id', 'title', 'date_created'],
    limit: 3
  })
);
```

::callout{icon="material-symbols:info-outline"}
**Breakdown of snippet**
- Imports
  - `createRDK` is required to create a client.
  - `rest` is required to make REST requests, and adds the `.request()` method.
  - `readItems` is a query function which fetches
- Creating the client
  - A new client is created and held in the `rdk` variable.
  - `createRDK` requires the valid URL of a RDK project.
  - The client is created with the `rest()` composable.
- Requests
  - `allPosts` makes a request to `readItems` in the `posts` collection.
  - `somePosts` does the same, but only the specified fields from the latest 3 published items.
::

::callout{icon="material-symbols:code-blocks-rounded" color="green" to="/api/items"}
The API Reference contains SDK examples for endpoints, showing the required function usage.
::

::callout{icon="material-symbols:menu-book-outline" color="primary" to="/guides/connect/query-parameters"}
See all query parameters with SDK examples.
::

### Custom Endpoints

To call custom endpoints using the SDK, you can manually provide a path and method. If using TypeScript, you can type the output.

::tabs
  ::div{class="pr-6"}
  ---
  label: JavaScript
  ---

  ```js
  import { createRDK, rest } from '@rdk/sdk';
  const rdk = createRDK('SERVER_URL').with(rest());

  const result = await rdk.request(() => ({
    path: '/custom/endpoint',
    method: 'GET',
  }));
  ```

  ::

  ::div{class="pr-6"}
  ---
  label: TypeScript
  ---
  ```ts
  import { createRDK, rest, customEndpoint } from '@rdk/sdk';
  const rdk = createRDK('SERVER_URL').with(rest());

  const result = await rdk.request(customEndpoint<OutputType>({
    path: '/custom/endpoint',
    method: 'GET',
  }));
  ```
  ::
::

### GraphQL Usage

Add the `graphql()` composable to the client, and use the `.query()` method.

```ts
import { createRDK, graphql } from '@rdk/sdk';

interface Post {
  id: number;
  title: string;
  content: string;
}

interface Schema {
  posts: Post[];
}

const rdk = createRDK<Schema>('SERVER_URL').with(graphql());

const result = await rdk.query<Post[]>(`
  query {
    posts {
      id
      title
      content
    }
  }
`);
```

## Authentication

The `authentication()` composable provides the RDK client with new `login()`, `logout()`, and `refresh()` methods. It also manages token storage and refreshing on your behalf.

```js
import { createRDK, authentication } from '@rdk/sdk';
const rdk = createRDK('SERVER_URL').with(authentication());

await rdk.login({ email, password }, login_options);
await rdk.refresh();
await rdk.logout();
```

This approach will handle refreshing of the token automatically. The current token is stored inside the initialized client.

### Login Options

The login options object contains three optional parameters to control the behavior of the request.

```ts
type LoginOptions = {
  otp?: string;
  mode?: AuthenticationMode;
  provider?: string;
};
```

- `otp` contains the user's one-time-password if two-factor authentication is enabled.
- `mode` defines how the refresh token is returned. One of `json`, `cookie` or `session`. Defaults to `cookie`.
- `provider` allows a specific authentication provider to be used. This is unavailable for SSO that relies on browser redirects.

### Token Management

#### Set Token

::tabs
  ::div{class="pr-6"}
  ---
  label: Create client with token
  ---
  Import `staticToken` and use it when creating a client.

  ```js
  import { createRDK, staticToken, rest } from '@rdk/sdk';
  const rdk = createRDK('SERVER_URL')
    .with(staticToken('TOKEN'))
    .with(rest());
  ```
  ::

  ::div{class="pr-6"}
  ---
  label: Token for single requests
  ---
  Import `withToken` and use it as a request function with your token as the first parameter, and your original request as the second.

  ```js
  import { createRDK, rest, withToken, readItems } from '@rdk/sdk';
  const rdk = createRDK('SERVER_URL').with(rest());

  const request = await rdk.request(
    withToken('TOKEN', readItems('posts'))
  );
  ```
  ::

  ::div{class="pr-6"}
  ---
  label: Set client token manually
  ---
  Import `authentication` or `staticToken` and use it when creating a client. You now have access to the `setToken` method.

  ```js
  import { createRDK, authentication } from '@rdk/sdk';
  const rdk = createRDK('SERVER_URL').with(authentication());

  await rdk.setToken('TOKEN');
  ```
  ::
::

#### Get a Token

Import `authentication` or `staticToken` and use it when creating a client. You now have access to the `getToken` method.

```js
import { createRDK, authentication } from '@rdk/sdk';
const rdk = createRDK('SERVER_URL').with(authentication());

const token = await rdk.getToken();
```

### Configure Custom Storage

Internally, `getToken()` and `setToken()` make use of the configurable storage, which can be customized for your environment's needs. There must be a `get()` and `set()` method exposed, and the `AuthData` type returned.

::callout{icon="material-symbols:info-outline"}
**Example**
Instead of storing `AuthData` in an object in the browser, this custom storage implementation stores and retrieves data in `localStorage`:

```js
import { createRDK, authentication } from '@rdk/sdk';

class LocalStorage {
  get() {
    return JSON.parse(localStorage.getItem("rdk-data"));
  }
  set(data) {
    localStorage.setItem("rdk-data", JSON.stringify(data));
  }
}

const storage = new LocalStorage();
const rdk = createRDK('SERVER_URL')
    .with(authentication('json', { storage }));

// Set a long term or static token without expiry information.
rdk.setToken('TOKEN');

// Set custom credentials to the storage.
storage.set({
  access_token: 'token',
  refresh_token: 'token',
  expires_at: 123456789
});
```
::

### Cross-Domain Cookies

A common situation is for the RDK backend and frontend to be hosted on different domains, requiring extra configuration to make sure cookies are passed correctly. Usually this is only required for authentication with cookies but this can be set globally for each composable that does requests. This will then apply to all requests made using that composable:

```js
const rdk = createRDK('SERVER_URL')
  .with(authentication('cookie', { credentials: 'include' }))
  .with(graphql({ credentials: 'include' }))
  .with(rest({ credentials: 'include' }));
```

Or you can enable this only for specific REST requests using the `withOptions`:

```js
const result = await rdk.request(
  withOptions(refresh(), { credentials: 'include' })
);
```

## Realtime

The RDK SDK makes it easier to work with :product-link{product="realtime"} by adding `.connect()`, `.subscribe()`, `.sendMessage()`, and `.onWebSocket()` methods. It also handles reconnect logic.

::callout{icon="material-symbols:menu-book-outline" color="primary" to="/getting-started/connect-to-realtime"}
Read the RDK Realtime quickstart.
::

## Global APIs

To keep the SDK dependency-free, it does rely on the APIs mentioned below, which originally came from the browser ecosystem and may not be available in all environments.

### The `fetch` API

This API is shipped with almost every modern runtime. Nevertheless, there might be reasons to overwrite or set the implementation, for example, if an alternative implementation is preferred or if you actually work with a special runtime where `fetch` is not available.

- [`node-fetch`](https://www.npmjs.com/package/node-fetch)
- [`ofetch`](https://www.npmjs.com/package/ofetch)
- [`whatwg-fetch`](https://www.npmjs.com/package/whatwg-fetch)

### The `URL` API

This API is shipped with almost every modern runtime. However, there are exceptions, like `react-native`, that require a polyfill for the SDK to work.

- [`url-polyfill`](https://www.npmjs.com/package/url-polyfill)
- [`react-native-url-polyfill`](https://www.npmjs.com/package/react-native-url-polyfill)

### The `WebSocket` API

This API is optional if you're not making use of the `realtime()` features in the SDK. Backend JavaScript environments often do not ship with an implementation of WebSockets.

- [`ws`](https://www.npmjs.com/package/ws)
- [`isomorphic-ws`](https://www.npmjs.com/package/isomorphic-ws)

### The `logger` API

This API is optional and currently only used for debugging `realtime()` features. This will default to the `Console` however in environments where this isn't shipped you can overwrite this with any logger.

### Polyfilling

There are two polyfilling approaches, with the first taking precedence.

#### Options Parameter of `createRDK`

```js
import { createRDK } from '@rdk/sdk';
import { ofetch } from 'ofetch';
import WebSocket from 'ws';

const rdk = createRDK('SERVER_URL', {
  globals: {
    WebSocket: WebSocket,
    fetch: ofetch,
  }
});
```

#### `globalThis` object

```js
import { createRDK } from '@rdk/sdk';
import { ofetch } from 'ofetch';
import WebSocket from 'ws';

globalThis.WebSocket = WebSocket;
globalThis.fetch = ofetch;

import 'react-native-url-polyfill/auto';

const rdk = createRDK('SERVER_URL');
```

Polyfill libraries will often register itself to the `globalThis` object. For example, the `react-native-url-polyfill` package.

## Error Handling

### `isRDKError` type guard

The SDK exports an `isRDKError` type guard utility function to determine if the error thrown was from the API

```js
import { createRDK, rest, isRDKError, readItems } from '@rdk/sdk';

const rdk = createRDK('SERVER_URL').with(rest());

try {
  const request = await rdk.request(readItems('posts')));
} catch(error){
  if(isRDKError(error)){
    // some error has been returned from the API
  } else {
    // some unknown non API error has been thrown (e.g. unable to parse the JSON response)
  }
}
```
