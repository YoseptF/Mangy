# Mangy web apps

This repository uses npm workspaces for independent web apps in `apps/`. Each app has its own Wrangler configuration and deploys as a separate Cloudflare Worker. Wrangler is installed once at the repository root.

## Get started

Install dependencies with `npm install`, then start the example app:

```sh
npm run dev --workspace @mangy/example
```

Wrangler prints the local URL. To deploy an app, first authenticate with `npx wrangler login`, then run:

```sh
npm run deploy --workspace @mangy/example
```

Deployment creates or updates the Worker named in that app's `wrangler.jsonc` in the selected Cloudflare account. Set the appropriate account and a unique Worker name before deploying; see [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Add an app

1. Copy `apps/example` to `apps/<app-name>` and replace its contents with your app.
2. Change the package name in its `package.json` to a unique workspace name, such as `@mangy/my-app`.
3. Change the Worker `name` in `wrangler.jsonc` to a unique Cloudflare Worker name. Adjust `assets.directory` if your app builds to a different directory, and add any build step to its scripts.
4. Run `npm install` at the repository root to update the lockfile. Use `npm run dev --workspace @mangy/my-app` and `npm run deploy --workspace @mangy/my-app` for that app.

The example serves static files from `public/` using [Workers static assets](https://developers.cloudflare.com/workers/static-assets/). Apps can add Worker code, bindings, frameworks, or their own dependencies as needed. Keep local credentials and secrets in `.dev.vars` or `.env` files, which are ignored by Git; use Wrangler secrets for deployed values.

## Invernadero Studio publishing

`apps/invernadero` is a separate Worker, `invernadero-studio`. Cloudflare Workers Builds connects it to this repository: non-production branches receive a Preview, and changes merged into `main` deploy to `invernadero.studio`. Previews are public URLs; do not put confidential content in them. Do not merge a site PR until its owner asks to publish.

For the Worker build connection, use the following settings:

- Production branch: `main`.
- Root directory: `apps/invernadero` (where this Worker's configuration lives).
- Build command: `npm ci --prefix ../..` (installs the root workspace lockfile).
- Deploy command: `npx wrangler deploy`.
- Preview command: `npx wrangler preview`.
- Enable preview builds for non-production branches.
- Include build watch paths: `apps/invernadero/*`, `package.json`, and `package-lock.json` (paths are relative to the repository root). Shared dependency changes can affect this app, so they must trigger a build too.

Each additional app needs its own Worker and Git connection with commands and watch paths for that app and any shared code it uses. Keep shared paths in every affected Worker's watch list. Do not rely on PR labels or branch names to select a site. A PR changing more than one app will build each affected app; merging it deploys each affected app.

The production domain is declared in `apps/invernadero/wrangler.jsonc` and is attached on production deployment. Cloudflare's `workers.dev` Preview URLs must be enabled on the Worker before previews have a URL. See [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) and [Preview URLs](https://developers.cloudflare.com/workers/previews/custom-domains/).
