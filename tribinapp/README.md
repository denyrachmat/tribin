# JAT Tribin App (tribinapp)

PT JAT Tribin App

> Build & install note for this workspace: installs land in the **repo-root**
> `node_modules/` (monorepo workspaces: `node_modules/tribinapp -> ../tribinapp`,
> so `tribinapp/node_modules/` does not exist). Always run yarn and the build
> from the **repo root**: see the root [docs/BUILD-AND-DEPLOY.md](../docs/BUILD-AND-DEPLOY.md)
> for the full working sequence.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
