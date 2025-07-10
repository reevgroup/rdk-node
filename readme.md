<p align="center"><img alt="RDK Logo" src="https://github.com/reevgroup/rdk-node/blob/main/rdk-logo.png?raw=true"></p>

## REEV Development Kit (RDK) for Javascript

The official Reev Development Kit (RDK) for Javascript that provides APIs for reading, creating, updating and deleting user and system data, authentication, and access to activity. Most methods are same as in JS, but there are some differences because of Dart type
system.

## Installation

### From GitHub

```bash
npm install git+https://github.com/reevgroup/rdk-node.git
```

```bash
yarn add git+https://github.com/reevgroup/rdk-node.git
```

```bash
pnpm add git+https://github.com/reevgroup/rdk-node.git
```

### From NPM (when published)

```bash
npm install @rdk/sdk
```

## Features

- **TypeScript first:** The SDK provides a robust and type-safe development experience.
- **Modular architecture:** The SDK is split into separate modules, giving you granular control over which features to
  include and which can be pruned at build-time.
- **Lightweight and dependency-free:** It does not require external libraries, ensuring a lighter bundle and streamlined
  experience.

## Quick Start

```ts
import { createRDK, rest, authentication } from '@rdk/sdk';

// Create a client with REST support
const client = createRDK<Schema>('https://your-rdk-instance.com')
  .with(rest())
  .with(authentication('json'));

// Login
await client.login({email: 'user@example.com', password: 'password'});

// Make requests
const items = await client.request(readItems('your_collection'));
```

## Composable Client

The client is split up in separate features you can mix and match to compose a client with only the features you need or
want.

```ts
const client = createRDK<Schema>('https://your-rdk-instance.com');
```

This client is currently an empty wrapper without any functionality. Before you can do anything with it you'll need to
add some features. The following composables are available/in progress:

- `rest()` REST request functions
  - adds `.request(...)` on the client
- `graphql()` GraphQL request functions
  - adds `.query(...)` on the client
- `staticToken()` authentication functions
  - adds `.getToken()` and `.setToken()` on the client
- `authenticate()` authentication functions
  - adds `.login({ email, password })`, `.logout()`, `.refresh()` on the client
  - adds `.getToken()` and `.setToken()` on the client
- `realtime()` websocket connectivity
  - adds `.subscribe(...)`, `.sendMessage(...)`, `.onWebsocket('message', (message) => {})` on the client

For this example we'll build a client including `rest` and `graphql`:

```ts
const client = createRDK<Schema>('https://your-rdk-instance.com').with(rest()).with(graphql());

// do a REST request
const restResult = await client.request(readItems('articles'));

// do a GraphQL request
const gqlResult = await client.query<OutputType>(`
    query {
        articles {
            id
            title
            author {
                first_name
            }
        }
    }
`);
```

## Authentication

```ts
const client = createRDK<Schema>('https://your-rdk-instance.com').with(rest()).with(authentication('json'));

await client.login('user@example.com', 'password');

// do authenticated requests
```

```ts
const client = createRDK<Schema>('https://your-rdk-instance.com').with(rest()).with(staticToken('your-token-here'));

// do authenticated requests
```

## Real-Time

The `realtime()` extension allows you to work with an RDK REST WebSocket.

Subscribing to updates:

```ts
const client = createRDK<Schema>('https://your-rdk-instance.com').with(
	realtime({
		authMode: 'public',
	}),
);

const { subscription, unsubscribe } = await client.subscribe('test', {
	query: { fields: ['*'] },
});

for await (const item of subscription) {
	console.log('subscription', { item });
}

// unsubscribe()
```

Receive/Send messages:

```ts
const client = createRDK<Schema>('https://your-rdk-instance.com').with(
	realtime({
		authMode: 'public',
	}),
);

const stop = client.onWebSocket('message', (message) => {
	if ('type' in message && message['type'] === 'pong') {
		console.log('PONG received');
		stop();
	}
});

client.sendMessage({ type: 'ping' });
```

## Build Your Schema

```ts
// The main schema type containing all collections available
interface MySchema {
	collection_a: CollectionA[]; // regular collections are array types
	collection_b: CollectionB[];
	collection_c: CollectionC; // this is a singleton
	// junction collections are collections too
	collection_a_b_m2m: CollectionAB_Many[];
	collection_a_b_m2a: CollectionAB_Any[];
}

// collection A
interface CollectionA {
	id: number;
	status: string;
	// relations
	m2o: number | CollectionB;
	o2m: number[] | CollectionB[];
	m2m: number[] | CollectionAB_Many[];
	m2a: number[] | CollectionAB_Any[];
}

// Many-to-Many junction table
interface CollectionAB_Many {
	id: number;
	collection_a_id: CollectionA;
	collection_b_id: CollectionB;
}

// Many-to-Any junction table
interface CollectionAB_Any {
	id: number;
	collection_a_id: CollectionA;
	collection: 'collection_b' | 'collection_c';
	item: string | CollectionB | CollectionC;
}

// collection B
interface CollectionB {
	id: number;
	value: string;
}

// singleton collection
interface CollectionC {
	id: number;
	app_settings: string;
	something: string;
}
```
