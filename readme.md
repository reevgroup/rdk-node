<p align="center"><img alt="RDK Logo" src="https://github.com/reevgroup/rdk-dart/blob/main/rdk-logo.png?raw=true"></p>

## Reev Development Kit (RDK) for Javascript

The official Reev Development Kit (RDK) for Javascript that provides APIs for reading, creating, updating and deleting user and system data, authentication, and access to activity. Most methods are same as in JS, but there are some differences because of Dart type
system.

## Installation

```
npm install @rdk/sdk
```

## Basic Usage

```js
import { RDK } from '@rdk/sdk';

const rdk = new RDK('http://rdk.example.com');

const items = await rdk.items('articles').readOne(15);
console.log(items);
```

```js
import { RDK } from '@rdk/sdk';

const rdk = new RDK('http://rdk.example.com');

rdk
	.items('articles')
	.readOne(15)
	.then((item) => {
		console.log(item);
	});
```

## Reference

See [the docs](https://docs.rdk.io/reference/sdk/) for a full usage reference and all supported methods.

## Contributing

### Requirements

- NodeJS LTS
- pnpm 7.5.0 or newer

### Commands

The following `pnpm` scripts are available:

- `pnpm lint` – Lint the code using Eslint / Prettier
- `pnpm test` – Run the unit tests

Make sure that both commands pass locally before creating a Pull Request.

### Pushing a Release

_This applies to maintainers only_

1. Create a new version / tag by running `pnpm version <version>`. Tip: use `pnpm version patch|minor|major` to
   auto-bump the version number
1. Push the version commit / tag to GitHub (`git push && git push --tags`)

The CI will automatically build and release to npm, and generate the release notes.
